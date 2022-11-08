import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useInView } from 'react-cool-inview';
import { isNil } from '../validations/is-nil';
export default function useInfiniteLoading({ fetchItems, useQueryParamsPagination = false }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Memorize loaded pages
  const initialPageNumber = useRef(useQueryParamsPagination ? searchParams.get('pageNumber') || 1 : 1);
  const lowestPageNumber = useRef(initialPageNumber.current);
  const highestPageNumber = useRef(initialPageNumber.current);

  const pageSize = useRef(searchParams.get('pageSize') || 15);
  const initialPageLoaded = useRef(false);
  const [hasNext, setHasNext] = useState(true);
  const [hasPrevious, setHasPrevious] = useState(true);
  const [items, setItems] = useState([]);

  const paramObj = useMemo(() => {}, []);
  for (let p of searchParams) {
    paramObj[p[0]] = p[1];
  }

  const loadItems = useCallback(
    async (page, limit, mergeMethod) => {
      useQueryParamsPagination &&
        setSearchParams({
          ...paramObj,
          pageNumber: Number(page),
          pageSize: Number(limit),
        });
      const { data } = await fetchItems({
        pageNumber: page,
        pageSize: limit,
      });
      const { result, pagination } = data;
      setHasNext(!isNil(pagination.urls.next));
      setHasPrevious(!isNil(pagination.urls.previous));
      setItems((prevItems) => (mergeMethod === 'append' ? [...prevItems, ...result] : [...result, ...prevItems]));
    },
    [fetchItems, paramObj, setSearchParams, useQueryParamsPagination],
  );

  useEffect(() => {
    if (initialPageLoaded.current) {
      return;
    }

    loadItems(initialPageNumber.current, pageSize.current, 'append');
    initialPageLoaded.current = true;
  }, [loadItems]);

  const loadNext = () => {
    // No more pages to load just for safety
    if (!hasNext) return;
    const nextPage = Number(highestPageNumber.current) + 1;
    useQueryParamsPagination &&
      setSearchParams({
        ...paramObj,
        pageNumber: Number(nextPage),
        pageSize: Number(pageSize.current),
      });
    loadItems(nextPage, pageSize.current, 'append');
    console.log(nextPage);
    highestPageNumber.current = nextPage;
    console.log(highestPageNumber.current);
  };

  const loadPrevious = () => {
    // No more pages to load just for safety
    if (!hasPrevious) return;
    const previousPage = Number(lowestPageNumber.current) - 1;
    useQueryParamsPagination &&
      setSearchParams({
        ...paramObj,
        pageNumber: Number(previousPage),
        pageSize: Number(pageSize.current),
      });
    loadItems(previousPage, pageSize.current, 'prepend');
    lowestPageNumber.current = previousPage;
  };

  const { observe: loadNextObserve } = useInView({
    rootMargin: '300px 0px',
    onEnter: () => {
      console.log('observer!');
      loadNext();
    },
  });

  const { observe: loadPreviousObserve } = useInView({
    onEnter: () => {
      loadPrevious();
    },
  });

  return {
    items,
    hasNext,
    hasPrevious,
    loadItems,
    loadNext,
    loadPrevious,
    loadNextRef: loadNextObserve,
    loadPreviousRef: loadPreviousObserve,
  };
}

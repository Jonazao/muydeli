import { useState, useEffect, useCallback, useRef } from 'react';
import { useInView } from 'react-cool-inview';
import { isNil } from '../validations/is-nil';

const mergeMethods = {
  append: 'append',
  prepend: 'prepend',
};

export default function useInfiniteLoading({ fetchItems }) {
  // Memorize loaded pages
  const initialPageNumber = useRef(1);
  const lowestPageNumber = useRef(initialPageNumber.current);
  const highestPageNumber = useRef(initialPageNumber.current);

  const pageSize = useRef(15);
  const initialPageLoaded = useRef(false);
  const [hasNext, setHasNext] = useState(true);
  const [hasPrevious, setHasPrevious] = useState(true);
  const [items, setItems] = useState([]);

  const loadItems = useCallback(
    async (page, limit, mergeMethod) => {
      const { data } = await fetchItems({
        pageNumber: page,
        pageSize: limit,
      });
      const { result, pagination } = data;
      setHasNext(!isNil(pagination.urls.next));
      setHasPrevious(!isNil(pagination.urls.previous));
      setItems((prevItems) =>
        mergeMethod === mergeMethods.append ? [...prevItems, ...result] : [...result, ...prevItems],
      );
    },
    [fetchItems],
  );

  useEffect(() => {
    if (initialPageLoaded.current) {
      return;
    }

    loadItems(initialPageNumber.current, pageSize.current, mergeMethods.append);
    initialPageLoaded.current = true;
  }, [loadItems]);

  const loadNext = () => {
    // No more pages to load just for safety
    if (!hasNext) return;
    const nextPage = Number(highestPageNumber.current) + 1;
    loadItems(nextPage, pageSize.current, mergeMethods.append);
    highestPageNumber.current = nextPage;
  };

  const loadPrevious = () => {
    // No more pages to load just for safety
    if (!hasPrevious) return;
    const previousPage = Number(lowestPageNumber.current) - 1;
    loadItems(previousPage, pageSize.current, mergeMethods.prepend);
    lowestPageNumber.current = previousPage;
  };

  const { observe: loadNextObserve } = useInView({
    rootMargin: '300px 0px',
    onEnter: () => {
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

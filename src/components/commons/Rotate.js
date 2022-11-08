import { styled } from '@mui/material/styles';
const Rotate = styled((props) => {
  const { expand, component: Component, ...other } = props;
  return <Component {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default Rotate;

import { styled } from '@mui/material/styles';
const Rotate = styled((props) => {
  const { isRotated, rotationDegrees, component: Component, ...other } = props;
  return <Component {...other} />;
})(({ theme, isRotated, rotationDegrees }) => ({
  transform: !isRotated ? 'rotate(0deg)' : `rotate(${rotationDegrees}deg)`,
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default Rotate;

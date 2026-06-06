export default function Card({ children, className = '', hover, glass, ...rest }) {
  const classes = `card ${hover ? 'card-hover' : ''} ${glass ? 'card-glass' : ''} ${className}`.trim();

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}

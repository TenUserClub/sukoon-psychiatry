export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading,
  disabled,
  ...rest
}) {
  const classes = `btn btn-${variant} ${size !== 'md' ? `btn-${size}` : ''} ${loading ? 'btn-loading' : ''} ${className}`.trim();

  return (
    <button className={classes} disabled={disabled || loading} {...rest}>
      {loading ? <span className="btn-spinner" /> : null}
      {children}
    </button>
  );
}

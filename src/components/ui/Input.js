export default function Input({ label, error, type = 'text', className = '', ...rest }) {
  const isTextarea = type === 'textarea';

  return (
    <div className="input-group">
      {label && <label>{label}</label>}
      {isTextarea ? (
        <textarea
          className={`textarea ${error ? 'input-error' : ''} ${className}`}
          {...rest}
        />
      ) : (
        <input
          type={type}
          className={`input ${error ? 'input-error' : ''} ${className}`}
          {...rest}
        />
      )}
      {error && <span className="error-text">{error}</span>}
    </div>
  );
}

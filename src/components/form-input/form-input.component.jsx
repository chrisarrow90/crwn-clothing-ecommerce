import React from 'react'

import './form-input.styles.scss'

const FormInput = ({ handleChange, name, label, ...otherProps }) => (
  <div className="group">
    <input className="form-input" name={name} onChange={handleChange} {...otherProps} />
    {label ? (
      <label
        className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}
        htmlFor={name}
      >
        {label}
      </label>
    ) : null}
  </div>
)

export default FormInput

import React, { useState } from 'react';
import './App.css';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    cpf: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementar lógica para enviar os dados do formulário para o servidor
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        </div>
        <div>
          <label>CPF:</label>
          <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} />
        </div>

        <div className="col-md-6 reject-checkbox">
          <div className="mb-2 text-center">
            <div className="checkbox-wrapper">
              <input
                name="ehs_approval"
                className="form-check-label custom-radio-label"
                id="Rejected"
                type="checkbox"
              />
              <label htmlFor="Rejected">
                <div className="tick_mark">
                  <div className="cross"></div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <button className="btn-53">
          <div className="original">Viva Perifa</div>
          <div className="letters">
            <span>E</span>
            <span>N</span>
            <span>T</span>
            <span>R</span>
            <span>E</span>
            <span></span>
          </div>
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;

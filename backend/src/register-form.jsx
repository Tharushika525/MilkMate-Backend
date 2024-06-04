
import React from 'react';
import { useForm } from 'react-hook-form';
import './register-form.css';

const RegistrationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <div className='backgroundimage'>
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" {...register('email', { required: true })} placeholder="Enter your Email" />
          {errors.email && <span>This field is required</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" {...register('password', { required: true, minLength: 4, maxLength: 12 })} placeholder="Enter password" />
          {errors.password && <span>Your password must be between 4 and 12 characters</span>}
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select {...register('gender', { required: true })}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && <span>This field is required</span>}
        </div>

        <div className="form-group">
          <label>City</label>
          <input type="text" {...register('city', { required: true })} placeholder="Enter the nearest City" />
          {errors.city && <span>This field is required</span>}
        </div>

        <div className="form-group">
          <label>Street Name</label>
          <input type="text" {...register('streetName', { required: true })} placeholder="Enter a Valid Address" />
          {errors.streetName && <span>This field is required</span>}
        </div>

        <div className="form-group">
          <label>Remarks (Optional)</label>
          <input type="text" {...register('remarks')} placeholder="Enter optional Remarks" />
        </div>

        <div className="form-group">
          <label>District</label>
          <select {...register('district', { required: true })}>
             <option value="Colombo">Colombo</option>
            <option value="Galle">Galle</option>
          </select>
          {errors.district && <span>This field is required</span>}
        </div>

        <div className="form-group form-group-inline">
          <input type="checkbox" {...register('terms', { required: true })} />
          <label>I agree to terms and conditions</label>
          {errors.terms && <span>You must agree to the terms</span>}
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
    </div>
  );
};

export default RegistrationForm;

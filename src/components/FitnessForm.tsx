import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fitnessFormState } from '../model/FitnessForm';
import { FormErrorState } from '../model/FormErrorState';
import axios, { AxiosResponse } from 'axios';
import { Messages } from '../messages/Messages';
import { Validator } from '../validators/Validation';

const FitnessForm: FC = () => {
  const [state, setState] = useState<fitnessFormState>({
    name: "",
    contactNo: "",
    duration: "",
    fitnessGoal: "",
    preferredTime: '',
    id: ""
  });

  const fitnessGoalList: string[] = [
    "Weight Loss", "Muscle Gain", "Endurance", "Cardiovascular Health"
  ]

  const [formErrors, setFormErrors] = useState<FormErrorState>({
    nameError: "",
    contactNoError: "",
    durationError: ""
  })

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [valid, setValid] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    axios.post(Messages.URL, state)
          .then((res:AxiosResponse)=>{
             setSuccessMessage(`${Messages.SUCCESS}${res.data.id}`)
          })
          .catch((err:Error)=>{
             setErrorMessage(Messages.ERROR)
          });
    // Your code here
    /* 
        1. You should prevent page reload on submit
        2. Make an axios call to the URL specified in messages/Messages.ts file :
            "http://localhost:2500/fitness-form/" passing the appropriate state as 
            data to the axios call.
        3. If the axios call is successful, assign the successMessage state to the 
              SUCCESS message from Messages.ts file with the ID received from the response: 
              "Successfully submitted with Id: + <id>. 
        4. If the axios call is not successful, assign the errorMessage state to the 
              ERROR message from Messages.ts file : "Please run the backend".
        5. Use Messages object imported from messages/Messages.ts file to set the URL, success and error messages
    */
      
        setTimeout(()=>{
          navigate('/home')
        },5000);
        // Note: On clicking the Join button, the successMessage must be displayed and after 5 sec the
        // page should be automatically navigated to Home page. --> Given in P
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
   /*
        1. This method will be invoked whenever the user changes the value of any form field. 
            This method should also validate the form fields.
        2. 'event' input parameter will contain both name and value of the form field.
        3. Set state using the name and value recieved from event parameter. 
        4. Call the validateField method for validating form fields.
        */
       console.log("event is event ...."+event.target.value)
       setState({...state, [event.target.name]:event.target.value})
       validateField(event.target.name, event.target.value);
  };

  const validateField = (name: string, value: any): void => {
    let errors = {...formErrors};
    /*
        1. Write validation for all input fields as given in QP document.
            Use appropriate methods imported from validators/Validation.ts 
        2. Set the error messages in formErrors state appropriately. 
            Use the Messages object imported from messages/Messages.ts
        3. Set the valid state to true if the below conditions are true
            - All the form fields are entered (Check by calling the validateForm 
                method in Validation.ts by passing the state as parameter)
            - The formErrors state must not contain any error messages
        4. If any of the above conditions are not true, set the valid state to false
    */
      switch(name){
         case "name":
           errors.nameError = Validator.validateName(value) ? "" : Messages.NAME_ERROR;
           break;
         
         case "contactNo":
           errors.contactNoError = Validator.validateContactNo(value) ? "" : Messages.CONTACTNO_ERROR;
           break;
           
         case "duration":
          errors.durationError = Validator.validateDuration(value) ? "" : Messages.DURATION_ERROR;
          break;

         default:
          break;
      }

      setFormErrors(errors);
      setValid(Validator.validateForm(state) && Object.values(errors).every((val) => val === ""));
  };

  return (
    <React.Fragment>
      <div className="container " >
        <div className="row">
          <br />
          <div className="offset-md-5 col-md-5  ">
            <br />
            <div>
              <div className="head">
                <h3><b>Elite Fitness Plan</b></h3>
              </div>
              <div>
                <form className="form form-background" onSubmit={handleSubmit} 
                //Your code here
                >
                    {/* create form as per the view given in screenshots */}
                    {/* Display field level formError state messages as given in QP */}
                    {/* Display success or error messages for axios calls as given in QP */}
                    <div className="form-group">
                       <label className='form-label' htmlFor='name'><b>Name</b></label>
                       <input type="text" name="name" className="form-control" placeholder="Enter your name" data-testid="join" value={state.name} onChange={handleChange}/>
                       <span className='text-danger'>{formErrors.nameError}</span>
                    </div>

                    <div className='form-group'>
                       <label htmlFor='contactNo' className='form-label'><b>Contact Number</b></label>
                       <input type="text" name="contactNo" className="form-control" placeholder="Enter your contact number" data-testid="join" value={state.contactNo} onChange={handleChange}/>
                       <span className='text-danger'>{formErrors.contactNoError}</span>
                    </div>

                    <div className='form-group'>
                       <label htmlFor='fitnessGoal' className='form-label'><b>Fitness Goal</b></label>
                       <select
                        className="form-control"
                         onChange={handleChange}
                          name="fitnessGoal"
                           value={state.fitnessGoal}>
                          <option value="" disabled>--Select your Fitness Goal--</option>
                          {fitnessGoalList.map((ele, index) => {
                            return <option key={index} value={ele}>{ele}</option>
                          })}
                       </select>
                    </div>
                    {/* <div className="form-group">
                                        <label className="form-label" htmlFor="fitnessGoal"><b>Fitness Goal</b></label>
                    
                                        <select
                                            className="form-control"
                                            // id="fitnessGoal"
                                            name="fitnessGoal"
                                            value={state.fitnessGoal}
                                            //Your code here
                                            onChange={handleChange}
                                        >
                                          <option value="" disabled>--Select your Fitness Goal--</option>
                                            {fitnessGoalList.map((goal, index) => {
                                                return <option key={index} value={goal}>{goal}</option>
                                            })}
                                        </select>
                                    </div> */}

                    <div className='form-group'>
                       <label className='form-label' htmlFor='preferredTime'><b>Preferred Time</b></label><br/>
                       <div className="form-check form-check-inline">
                         <label className='form-check-label'>Morning</label>
                         <input type="radio" value="Morning" name="preferredTime" className="form-check-input" checked={state.preferredTime === 'Morning'} onChange={handleChange}/>
                       </div>

                       <div className="form-check form-check-inline">
                         <label className='form-check-label'>Afternoon</label>
                         <input type="radio" value="Afternoon" name="preferredTime" className="form-check-input" checked={state.preferredTime === 'Afternoon'} onChange={handleChange}/>
                       </div>

                       <div className="form-check form-check-inline">
                         <label className='form-check-label'>Evening</label>
                         <input type="radio" value="Evening" name="preferredTime" className="form-check-input" checked={state.preferredTime === 'Evening'} onChange={handleChange}/>
                       </div>
                    </div>
                    
                    <div className='form-group'>
                       <label className='form-label' htmlFor='preferredTime'><b>Duration</b></label>
                       <input type="number" name="duration" className="form-control" placeholder="Enter your duration in hours" value={state.duration} data-testid="join" onChange={handleChange}/>
                       <span className='text-danger'>{formErrors.durationError}</span>
                    </div>

                    <div className='form-group text-center'>
                      <button className='btn btn-primary mt-3' type="submit" disabled={!valid}>Join</button>
                      <br/>
                      <div className='text-center form-group'>
                        <span className='text-success'><b>{successMessage}</b></span>
                        <span className='text-danger'><b>{errorMessage}</b></span>
                      </div>
                    </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>

    </React.Fragment>
  );
};

export default FitnessForm;

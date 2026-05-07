
import React from "react";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Messages } from "../messages/Messages";
import axios, { AxiosResponse } from "axios";
import { Validator } from "../validators/Validation";
 
const UpdateForm: FC = () => {
    let params = useParams<{ joiningId: string }>();

    const [join,setJoin]=useState({
        joiningiId: "",
        name: "",
        contactNo: "",
        duration: "",
        fitnessGoal: "",
        preferredTime: "",
        
    });

    const fitnessGoalList: string[] = [
        "Weight Loss", "Muscle Gain", "Endurance", "Cardiovascular Health"
    ]

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const isDisabled = !(
        join.name &&
        join.contactNo &&
        join.duration &&
        join.fitnessGoal &&
        join.preferredTime
    );

    useEffect(() => {
        axios.get(`${Messages.URL}${params.joiningId}`)
             .then((res: AxiosResponse) => {
                // Use response payload directly to avoid stale state issues
                setJoin({...join,
                    joiningiId: res.data.id,
                    name: res.data.name,
                    contactNo: res.data.contactNo,
                    duration: res.data.duration,
                    fitnessGoal: res.data.fitnessGoal,
                    preferredTime: res.data.preferredTime,
                });
            })
            .catch(() => {
                setError(Messages.UPDATE_FETCH_ERROR);
            });
    }, [params.joiningId]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>): void => {
        const { name, value } = event.target;
        setJoin((prevState) => ({
            ...prevState,
            [name]: value,  
        }));
  
    };

    const update = (e: React.FormEvent): void => {
        e.preventDefault();

        axios.put(`${Messages.URL}${params.joiningId}`, join)
            .then((res: AxiosResponse) => {
                setSuccess(Messages.UPDATE_SUCCESS);
            })
            .catch((err: Error) => {
                setError(Messages.UPDATE_ERROR);
            });
    }

    return (
        <React.Fragment>
            <div className="container " >
                <div className="row">
                    <br />
                    <div className="offset-md-5 col-md-5  ">
                        <br />
                        <div>
                            <div className="head">
                                <h3><b>Update Your Fitness Plan</b></h3>
                            </div>
                            <div>

                                <form className="form form-background" onSubmit={update}
                                    //Your code here
                                >

                                {/*    
                                1. Form should be controlled
                                2. On change of input fields, set respective states with form values.
                                3. Display error and success messages appropriately
                                4. Invoke 'update' methods on submit using an appropriate event handler on <form> tag,
                                */}

                                    <div className="form-group">
                                        <label className="form-label" htmlFor="name"><b>Name</b></label>
                                        <input
                                            type="text"
                                            placeholder="Enter your name"
                                            className="form-control"
                                            name="name"
                                            id="name"
                                            data-testid="name"
                                            value={join.name}
                                            //Your code here
                                            onChange={handleChange}
                                        />

                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="contactNo"><b>Contact Number</b></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="contactNo"
                                            name="contactNo"
                                            value={join.contactNo}
                                            //Your code here
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" htmlFor="fitnessGoal"><b>Fitness Goal</b></label>
                                        <select
                                            className="form-control"
                                            id="fitnessGoal"
                                            name="fitnessGoal"
                                            value={join.fitnessGoal}
                                            //Your code here
                                            onChange={handleChange}
                                        >
                                        
                                            {fitnessGoalList.map((goal, index) => {
                                                return <option key={index} value={goal}>{goal}</option>
                                            })}
                                        </select>
                                    </div>


                                    <div>
                                        <label className="form-label" htmlFor="preferredTime"><b>Preferred Time</b></label>
                                    </div>
                                    <div className="form-check form-check-inline">

                                        <label className="form-check-label">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                name="preferredTime"
                                                id="preferredTime"
                                                data-testid="preferredTime"
                                                value="Morning"
                                                checked={join.preferredTime === "Morning"}
                                                //Your code here
                                                 onChange={handleChange}
                                                 />
                                            Morning

                                        </label>
                                    </div>

                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                name="preferredTime"
                                                id="preferredTime"
                                                data-testid="preferredTime"
                                                value="Afternoon"
                                                checked={join.preferredTime === "Afternoon"}
                                                //Your code here
                                                onChange={handleChange}
                                                />
                                            Afternoon
                                        </label>
                                    </div>

                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                name="preferredTime"
                                                id="preferredTime"
                                                data-testid="preferredTime"
                                                value="Evening"
                                                checked={join.preferredTime === "Evening"}
                                                //Your code here
                                                onChange={handleChange}
                                                />
                                            Evening
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="duration"><b>Duration</b></label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="duration"
                                            name="duration"
                                            value={join.duration}
                                            //Your code here
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group text-center">
                                        <button
                                            type="submit"
                                            name="button"
                                            className="btn btn-primary mt-2 text-center"
                                            disabled={isDisabled}
                                        >
                                            Update
                                        </button>
                                    </div>

                                    {/* Display success/error states related to axios calls */}
                                    <div className="text-success text-center" data-testid="success">
                                        <h5><b>{success}</b></h5>
                                    </div>
                                    <div className="text-danger text-center" data-testid="error">
                                        <h5><b>{error}</b></h5>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}
export default UpdateForm;
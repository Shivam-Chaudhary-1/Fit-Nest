
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ViewFormState } from "../model/ViewForm";
import axios, { AxiosResponse } from "axios";
import { Messages } from "../messages/Messages";

const ViewForm: FC = () => {
  const [state, setState] = useState<ViewFormState>({
    joiningId: "",
    infoMessage: "",
    isTableEnabled: false,
    allJoinedData: []
  });

  const navigate = useNavigate();

  const isUpdate = (joiningId: string) => {
    //When Update button is clicked, navigate to '/update-form'+state.joiningId
     navigate(`/update-form/${joiningId}`);
  }

  const onDelete = (joiningId: string) => {
    /* when Delete button is clicked,  make axios call to URL in messages/Messages.ts file 
          "http://localhost:2500/fitness-form/"+<joining Id>   
          and handle the response accordingly.
    */
     axios.delete(`${Messages.URL}${joiningId}`)
          .then((res:AxiosResponse)=>{
            setState((prev) => ({...prev, 
              allJoinedData:prev.allJoinedData.filter((item)=>(item.id !== joiningId))
            }))
          })   
          .catch((err:Error)=>{
            console.log("Error Occured while updating")
          })
  };

  const fetchAll = (event: React.FormEvent): void => {
    
    /*
          1.You should prevent page reload on submit
          2. Make an axios call to fetch all the data from URL specified in Messages.ts file:  "http://localhost:2500/ fitness-form/"
          3. In case of successful response:
              -Set the allJoinedData state with the success response data received from the axios call and clear the infoMessage state
              Set isTableEnabled state to true
          4. If the axios call is not successful, assign the infoMessage state to "Failed to fetch all joined entries!" 
              and clear allJoinedData state. Also set isTableEnabled state to false.
          5. Use Messages object imported from messages/Messages.ts file to set the infoMessage

    */
     event.preventDefault();
     axios.get(Messages.URL)
          .then((res:AxiosResponse)=>{
            console.log("data....."+res.data)
              setState((prev)=>({...prev,
              allJoinedData:res.data,
              infoMessage:"",
              isTableEnabled: true,
              }));
          }) 
          .catch(() => {
            setState((prev) => ({
              ...prev,
              allJoinedData: [],
              infoMessage: Messages.VIEW_INFO_MESSAGE,
              isTableEnabled: false,
            }));
          })

  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <br />
          <div className="offset-md-4 col-md-5">
            <br />
            <div>
              <div className="head">
                <h3><b>Fitness Insights</b></h3>
              </div>

              <div className="text-center mt-4 ">
                <button className="btn btn-primary"
                  //Your code here
                   onClick={fetchAll} type="button"
                  >
                  Get All Joined Entries
                </button>
              </div>

              {state.isTableEnabled && state.allJoinedData.length > 0 && (
                <div className="mt-3 ">

                  <table className="table table-striped custom-table" >
                    <thead>
                      <tr>
                        <th>JoiningId</th>
                        <th>Name</th>
                        <th>Contact Number</th>
                        <th>Fitness Goal</th>
                        <th>Preferred Time</th>
                        <th>Duration</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.allJoinedData.map((entry, index) => (
                        <tr key={index}>
                          <td>{entry.id}</td>
                          <td>{entry.name}</td>
                          <td>{entry.contactNo}</td>
                          <td>{entry.fitnessGoal}</td>
                          <td>{entry.preferredTime}</td>
                          <td>{entry.duration}</td>
                          <td >
                            <button className="btn btn-success btn-sm"
                             //Your code here
                             onClick={()=> isUpdate(entry.id)}
                            >
                              Update
                            </button>
                            &nbsp;
                            <button className="btn btn-danger btn-sm" 
                            onClick={()=> onDelete(entry.id)}
                            >
                              Delete
                            </button>

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div data-testid="message" className="text-danger  text-center mt-3">
                  {/* Display infoMessage here  */}
                  {/* <span className="text-danger">{Messages.VIEW_INFO_MESSAGE}</span> */}
                   {state.infoMessage}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewForm;
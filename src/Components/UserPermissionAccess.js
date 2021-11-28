import React, { useState } from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const getUser = ``

function UserPermissionAccess() {


    let arr = []
    // const plants = {
    //     "Chinchwad": ["CD (CHD DEALERS)", "CE (CHD EQPT)", "CG (CHD PWRG)", "CH (CHD CONS)", "CJ (CHD PROJ)", "CW (CHD WAPS)", "PE (PMP EQPT)"],
    //     "Raipur": ["RC (RPR CONS)"],
    //     "Chennai": ["CC (CHN CONS)"],
    //     "Silvasa": ["SC (SIL CONS)"],
    //     "HO": ["HO (HEAD OFFICE)",]
    // }
    const plants = {
        "Chinchwad": ["CHD"],
        "Raipur": ["RPR"],
        "Chennai": ["CHN"],
        "Silvasa": ["SIL"],
        "HO": ["HO",]
    }

    Object.keys(plants).map(plant => {
        arr.push(plant)
    })


    const [op_plant, setOp_plant] = useState([])

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        // var chars = name.split(',');
        setOp_plant({
            ...op_plant,
            [name]: name,
        });
    }

    return (
        <div>
            <form>

                <input type="text" name="" value="" placeholder="Enter User" />
                <button type="">check</button>
                <FormGroup row>
                    {arr.map(i => {
                        return (
                            <FormControlLabel onChange={handleChange} control={<Checkbox />} name={plants[i]} label={i} />
                        )
                    })}
                </FormGroup>
                <div>
                    button
                </div>
            </form>
            {/* <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header">
                    <Typography>Create User</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <input type="text" name="" value="" placeholder="Email-Id" />
                        <input type="text" name="" value="" placeholder="Username" />
                        <input type="text" name="" value="" placeholder="Password" />
                        <input type="" name="" value="" placeholder="Confirm Password" />
                    </div>
                    <FormLabel >Plant</FormLabel>
                    <FormGroup row>
                        {arr.map(i => {
                            return (
                                <FormControlLabel onChange={handleChange} control={<Checkbox />} name={plants[i]} label={i} />
                            )
                        })}
                    </FormGroup>
                    <button type="" onClick={""} >Create</button>
                </AccordionDetails>
            </Accordion> */}


        </div>
    )
}

export default UserPermissionAccess

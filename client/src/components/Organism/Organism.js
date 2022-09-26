import React, { useRef, useContext, useState, useEffect } from "react";
import './Organism.css'
import {useNavigate} from "react-router-dom"
import { AuthContext } from "../../Context/authContext";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';


export default function Organism(props) {
    const navigate = useNavigate();
    const [expand, setExpand] = useState(false)

    const { user, dispatch } = useContext(AuthContext);
    
    function zeroPad(aNumber) {
        return ("0"+aNumber).slice(-2);
    }
    function humanTime(timeStamp) {
       var M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
       var D = new Date(timeStamp); // 23 Aug 2016 16:45:59 <-- Desired format.
       return D.getDate() + " " + M[D.getMonth()] + " " + D.getFullYear() + " " + D.getHours() + ":" + zeroPad(D.getMinutes()) + ":" + zeroPad(D.getSeconds());
    }

    function handleExpand(){
        setExpand(prev=>!prev)
    }

    const handleOrg = (e) => {
    
        dispatch({ type: "SELECT_SUCCESS", payload: [user,props.orgId]});
        localStorage.setItem("org", JSON.stringify(props.orgId))
        navigate("/organism/"+props.orgId._id);

    

    }

    
    return(
            // <tr onClick={handleOrg} className="sortable">
            //     <td>{props.orgId.name}</td>
            //     <td>{props.orgId.Adresse}</td>
            //     <td>{props.orgId.tel}</td>
            // </tr>
            <Card sx={{ height: 'max-content' }} className="m-2 col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                <CardActionArea onClick={handleOrg}>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <h3>{props.orgId.name}</h3>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <b style={{fontWeight:"600"}}>Sites :</b> {props.orgId.site_num}<br/>
                        <b style={{fontWeight:"950"}}>Domaines:</b> {props.orgId.domaines}<br/>
                        <b style={{fontWeight:"600"}}>Date de creation:</b> {humanTime(props.orgId.creation_date)}<br/>
                        <b style={{fontWeight:"950"}}>Localisation:</b> {props.orgId.Carte}<br/>
                        {expand && (
                            <><b style={{fontWeight:"600"}}>Tel:</b> {props.orgId.tel}<br/>
                            <b style={{fontWeight:"950"}}>Adresse:</b> {props.orgId.Adresse}<br/></>
                        )}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className="d-flex align-items-center justify-content-center p-0">
                    <Button onClick={handleExpand} size="small" color="primary">
                        <div className="text-center">{expand ? "réduire" : "étendre"}</div>
                    </Button>
                </CardActions>
            </Card>
    )
}
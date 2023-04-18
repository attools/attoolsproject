import Navbar from "react-bootstrap/Navbar";
import React ,{useState,useRef} from "react";
import logo from "../assets/menu-logo.svg";
import Nav from 'react-bootstrap/Nav';
import _ from "lodash";
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';
import  AddeditJob from '../components/add-job-post';
import AppToast from '../components/app-toast';
import celebrate from '../assets/celebrate_fill.svg';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import JuniorAnniversaryPost from '../components/add-junioranniversary';

function Menubar() {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const [showAddmsg,setAddmsg]=useState(false);
  const [showjuniorToast ,  setJuniorToast] = useState(false);
  const [showpopover, setPopoverShow] = useState(false);
  const [popovertarget, setPopTarget] = useState(null);
  const [showSeniorpost, setshowSeniorModal] =  useState(false);
  const [showJuniorPost,setshowJuniorModal] = useState(false);
  const ref = useRef(null);


  const closePanel=(data)=>{setAddmsg(true);setShow(data);setTimeout(() => {
    setAddmsg(false)
  }, 3000);}

  const closeJuniorModal = (data)=>{
    setJuniorToast(true);
    console.log("dta",data);
    setshowJuniorModal(data);
    setTimeout(() => {
      setJuniorToast(false)
    }, 3000);
  }
  const closeAddDialog=(data)=>{setShow(data)}
  const closejuniorDialog = (data)=>{setshowJuniorModal(data)}
  const enabledNav = !_.isNil(location.state) || location.pathname === '/joblist' ? true : false;
  const iconName = !_.isNil(location.state)  ? location?.state?.icon : '';
  const navtitle = !_.isNil(location.state) ? location?.state?.title : "";
  const handlePopbtn = (event) => {
    setPopoverShow(!showpopover);
    setPopTarget(event.target);
  };
  
  return (
    <div className="">
      <Navbar
        className="nav-bar-bg custom-align-center"
        expand="lg"
        fixed="top"
      >
        <Navbar.Brand href="/home">
          {location.pathname === "/home" ? (
            <img src={logo} alt="logo" width="127" height="44" />
          ) : (
            <i className="mgc_arrow_left_line p-l-24 mobile-view"></i>
          )}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="custom-nav-links custom-width custom-icon-fontsize">
          {enabledNav && location?.pathname === "/joblist" ? (
            <Nav.Link href="/home">
              <i
                className={`custom-vertical-align-bottom p-r-12 ${iconName}`}
              ></i>
              <span className="nav-link-title custom-align-text-bottom">
                {navtitle}
              </span>
            </Nav.Link>
          ) : (
            ""
          )}

          {location?.pathname === "/anniversarylist" ? (
            <Nav.Link href="/home">
              <img src={celebrate} width="24" alt="img"></img>
              <span className="nav-link-title custom-align-bottom p-l-8">
                {navtitle}
              </span>
            </Nav.Link>
          ) : (
            ""
          )}
          {enabledNav && location?.pathname === "/joblist" && (
            <Nav.Link className="p-a-0">
              <Button
                variant="primary"
                className="create-btn"
                onClick={() => setShow(true)}
              >
                Create new
              </Button>
            </Nav.Link>
          )}
        </Nav>
        {location?.pathname === "/anniversarylist" && 
        <Nav.Link className="p-a-0">
         <div ref={ref}>
            <Button onClick={handlePopbtn}   variant="primary" className="create-btn">Create New</Button>
            {
            showpopover &&  
            <Overlay
            show={showpopover}
            target={popovertarget}
            placement="bottom"
            container={ref}
            containerPadding={20}
          >
            <Popover id="popover-contained">
              <Popover.Header className="custom-display-none" as="h3"></Popover.Header>
              <Popover.Body>
               <p className="popover-p" onClick={()=>setshowJuniorModal(true)}>Junior</p>
               <p className="popover-p" onClick={()=>setshowSeniorModal(true)}>Senior</p>
              </Popover.Body>
            </Popover>
          </Overlay>
        
          }
          </div>
       
          </Nav.Link>}
      </Navbar>
      <div className="">
        {show && (
          <AddeditJob
            isModalshow={show}
            closePanel={closePanel}
            closeDialog={closeAddDialog}
          />
        )}
      </div>
      {showAddmsg && (
        <AppToast
          showAleart={showAddmsg}
          icon="mgc_check_circle_fill"
          message={`Job post Created Successfully`}
        />
      )}
      {
        showjuniorToast && <AppToast
        showAleart={showjuniorToast}
        icon="mgc_check_circle_fill"
        message={`Junior's Anniversary Post Created Successfully`}
      />
      }
      {showJuniorPost&& <JuniorAnniversaryPost showModal={showJuniorPost} closeJuniorModal={closeJuniorModal} title="Junior" closejuniorDialog={closejuniorDialog}/>}
    </div>
  );
}
export default Menubar;

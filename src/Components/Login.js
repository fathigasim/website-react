// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
// import Container from "react-bootstrap/Container";
// import Card from "react-bootstrap/Card";

// import axios from "axios";
// import { useAuth } from "../Context/AuthContext";
// import { useState,useEffect } from "react";
// import { useNavigate, useLocation,useSearchParams  } from "react-router-dom";
// import { BsBoxArrowInRight } from 'react-icons/bs';
// import { useForm } from 'react-hook-form';
// import { Link } from "react-router-dom";
// import axiosInstance from "../hooks/axiosInstance";

// const Login = () => {
 
//   const {login } = useAuth();

//   const navigate = useNavigate();
//   const location = useLocation();
  
//   // Read returnUrl from query string
//   const queryParams = new URLSearchParams(location.search);
//   const returnUrl = decodeURIComponent(queryParams.get("returnUrl") || "/");

//   const [formValues, setFormValues] = useState({
//     username: "",
//     password: "",
//     // role: "",
//   });

//   // const [user, setUser] = useState("");
  
//   const LOGIN_URL = `https://localhost:7228/api/Login`;
//  const {
//     register,
//     handleSubmit,
//     setError,
//     formState: { errors,isSubmitting,onSucess, isSubmitSuccessful },
//     reset
   
//   } = useForm({
//     defaultValues:{
//       username:'fathi'
//     }
//   });
//     useEffect(() => {
//         if (isSubmitSuccessful) {
//             reset(); // Resets the form to its default values or an empty state
//         }
//     }, [isSubmitSuccessful, reset]);




  
//   const onSubmit = async (data) => {
//     //  const formData = new FormData();
//     // formData.append("username", data.username);
//     // formData.append("password", data.password);
//     const obj={username:data.username,password:data.password}
    
//       // await new Promise((resolve)=>setTimeout(resolve,2000))
//       try {
//       await axios
//         .post(LOGIN_URL, obj, {
//           headers: {
//             "Content-Type":"application/json",
//           },
//         })
//         .then((response) => {
//            if (response.status === 200) {
//             const token = response.data.token; // adjust if API returns differently
//       // localStorage.setItem("token", token);
//       // console.log("Saved token:", token);
            
//          login(token);
 
//        console.log("Redirecting to 👉", returnUrl);
//   navigate(returnUrl, { replace: true });
          
//            }
           
//             console.log(response.data)

      
//         }).catch((err)=>{
//                console.log(err.response.data)
//                 setError("root", {
//           type: "manual",
//           message: err.response.data
//         });
//         })
//       } catch (error) {
//         console.error("Login failed:", error);
//     setError("root", {
//           type: "manual",
//           message: error.response?.data?.message || "Login failed. Please try again."
//         });
//       }
//   };
//   return (
//     <>
      
//       <Container className="mt-5">
//       <Row className="justify-content-md-center">
//         <Col md={4}>
//           <Card>
//             <Card.Body>
//               <h3 className="mb-4">Login</h3>
// {/* onSuccess={() => reset()} */}
//               <Form   onSubmit={handleSubmit(onSubmit)}  onSucess={() => reset()} >
//                 <Form.Group className="mb-3" controlId="formUser">
//                   <Form.Label>Email address</Form.Label>
//                   <Form.Control
//                     // required
//                     // type="email"
//                     // placeholder="Enter email"
//                     // name="email"
//                     // value={formValues.email}
//                     // onChange={handleChange}
//                     //, pattern:{value:/^\S+@\S+\.\S+$/,message:'not valid email'} 
//                    {...register('username', { required: 'username is required'
//                   //   ,validate:(value)=>
//                   //  { if(!value.includes('@'))
//                   //     { return 'must include @' }
//                   //  else{
//                   //   return true
//                   //  }
//                   // }
//                     })}
//                     type="text"
//                     placeholder="Enter email"
//                     autoComplete="off"
//                     // onChange={handleChange}
//                 />
//                   {errors.username && <span>{errors.username.message}</span>}
             
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formPassword">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control
//                     // required
//                     // type="password"
//                     // placeholder="Password"
//                     // name="password"
//                     // value={formValues.password}
//                     // onChange={handleChange}
//                     // , minLength: 6 
//                     // , { required: 'password is required'}
//                     {...register('password')}
//                     type="password"

//                   />
//                   {errors.password && <span>{errors.password.message}</span>}
                
//                 </Form.Group>

              

//                 <Button disabled={isSubmitting} variant="primary" type="submit" className="w-100">
//                  <BsBoxArrowInRight size="1.5em" />{' '}
//                   <span>{isSubmitting ?'Loading':'Submit'}</span>
//                 </Button>
//                           {errors.root && <span>{errors.root.message}</span>}
//               </Form>
              
//               {isSubmitSuccessful && <p>Form submitted successfully!</p>}
//             </Card.Body>
//              <Link to='/forgotPassword'>Forgot Password !</Link>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//     </>
//   );
// };

// export default Login;

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../Context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { BsBoxArrowInRight } from "react-icons/bs";

const LOGIN_URL = "https://localhost:7228/api/Login";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract redirect param
  const params = new URLSearchParams(location.search);
  const redirect = params.get("redirect") || "/";

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues: { username: "", password: "" },
  });

  // Reset form on successful submit
  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(LOGIN_URL, {
        username: data.username,
        password: data.password,
      });

      const token = response?.data?.token;
      if (!token) {
        setError("root", { type: "manual", message: "No token returned from server." });
        return;
      }

      // Log in using AuthContext
      login( token );

      // Redirect safely
      let target = redirect;
      if (target.startsWith("/login")) target = "/";
      navigate(target, { replace: true });
    } catch (err) {
      // Safe error handling
      const message =
        err?.response?.data?.message ||
        err?.response?.data ||
        err.message ||
        "Login failed. Please try again.";

      console.error("Login failed:", message);
      setError("root", { type: "manual", message });
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={4}>
          <Card>
            <Card.Body>
              <h3 className="mb-4">Login</h3>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    autoComplete="off"
                    {...register("username", { required: "Username is required" })}
                  />
                  {errors.username && <span className="text-danger">{errors.username.message}</span>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    {...register("password", { required: "Password is required" })}
                  />
                  {errors.password && <span className="text-danger">{errors.password.message}</span>}
                </Form.Group>

                <Button disabled={isSubmitting} variant="primary" type="submit" className="w-100 mb-2">
                  <BsBoxArrowInRight size="1.5em" /> {isSubmitting ? "Loading..." : "Login"}
                </Button>

                {errors.root && <span className="text-danger">{errors.root.message}</span>}
                {isSubmitSuccessful && <p className="text-success">Form submitted successfully!</p>}
              </Form>

              <Link to="/forgotPassword">Forgot Password?</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

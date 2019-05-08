import styled from 'styled-components'

const AuthForm = styled.div`

  background: linear-gradient(to bottom right, rgba(0,0,0,.7), rgba(0,0,0,.3)), url('/images/bg_small.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-position-x: 53%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  @media (min-height: 678px) {
    background: linear-gradient(to bottom right, rgba(0,0,0,.7), rgba(0,0,0,.3)), url('/images/bg_big.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position-x: 53%;
  }
  /* @media (min-width: 576px) {
    background-position: center;
  } */


  .form {
    padding: 2rem;
    background-color: white;
    border-radius: 8px;
    @media (max-width: 576px) {
    transform: translateY(-2rem);
    width: 80%;
    }
  }

  .form__name {
    margin: 0;
    margin-bottom: 1.5rem;
    font-size: 4rem;
    @media (min-width: 576px) {
      font-size: 5rem;
    }
  }

  .inputGroup {
    font-size: 2rem;
    margin: 0;
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    @media (min-width: 576px) {
      font-size: 3rem;
    }

    label {
      margin-bottom: 0.5rem;
    }
    
  }
  .form__button {
    color: ${props => props.theme.fontColorWhite};
    background: ${props => props.theme.confirm};
    border: 1px solid #555;
    border-radius: 5px;
    padding: .5rem 1.6rem;
    font-size: 2rem;
    text-transform: uppercase;
    cursor: pointer;
    width: 100%;
  }
  .form__link--container {
    display: flex;
    flex-direction: column;
  }

  .form__link {
    display: block;
    margin: 0 auto;
    margin-top: 1rem;
    padding-bottom: .3rem;
    color :${props => props.theme.fontColorGrey};
    text-decoration: none;
    text-align: center;
    border-bottom: 1px solid transparent; 
  }
  .form__link:hover {
    border-bottom: 1px solid ${props => props.theme.fontColorGrey};

    /* text-decoration: underline; */
  }
  .errorMessage {
    display: block;
    margin: 1rem 0;
    color :${props => props.theme.fontColorGrey};
  }

  .testAccount {
    /* display: inline-block; */
    font-size: 2rem;
    cursor: pointer;
    margin-top: 1rem;
    background: none;
    border: none;
    color: black;
  }
  
`

export default AuthForm
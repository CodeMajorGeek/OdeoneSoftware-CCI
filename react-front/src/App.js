import { Routes, Route } from "react-router-dom"
import { useState } from "react"

import "./App.css";

import Header from "./components/Header"
import Footer from "./components/Footer"
import Account from "./components/Account";

import Home from "./routes/Home"
import About from "./routes/About"
import Functions from "./routes/Functions"
import Demos from "./routes/Demos"
import Tutos from "./routes/Tutos"
import FAQ from "./routes/FAQ"
import Blog from "./routes/Blog"
import Contact from "./routes/Contact"

import Modal from "./components/modals/Modal"
import LoginModal from "./components/modals/LoginModal"
import RegisterModal from "./components/modals/RegisterModal";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  const isShowingModal = showLoginModal || showRegisterModal;

  return (
    <div className="App">
      <div hidden={ isShowingModal }>
        <Header 
          account={<Account setShowLoginModal={ setShowLoginModal } setShowRegisterModal={ setShowRegisterModal } /> } />
        <main>
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/accueil" element={ <Home /> } />
            <Route path="/a-propos" element={ <About /> } />
            <Route path="/fonctions" element={ <Functions /> } />
            <Route path="/demonstration" element={ <Demos /> } />
            <Route path="/tutoriels" element={ <Tutos /> } />
            <Route path="/faq" element={ <FAQ /> } />
            <Route path="/blog" element={ <Blog /> } />
            <Route path="/contact" element={ <Contact /> } />
          </Routes>
        </main>
        <Footer />
      </div>
      <Modal show={ showLoginModal } setShow={ setShowLoginModal } modalContent={ <LoginModal /> } />
      <Modal show={ showRegisterModal } setShow={ setShowRegisterModal } modalContent={ <RegisterModal /> } />
    </div>
  );
}

export default App;

import { Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux"

import "./App.css"

import Header from "./components/Header"
import Footer from "./components/Footer"

import Home from "./routes/Home"
import About from "./routes/About"
import Functions from "./routes/Functions"
import Demos from "./routes/Demos"
import Tutos from "./routes/Tutos"
import FAQ from "./routes/FAQ"
import Contact from "./routes/Contact"

import AdminHome from "./routes/admin/AdminHome"
import AdminUser from "./routes/admin/AdminUser"
import AdminFunctions from "./routes/admin/AdminFunctions"
import AdminFAQ from "./routes/admin/AdminFAQ"
import AdminTutos from "./routes/admin/AdminTutos"

import Modal from "./components/modals/Modal"
import LoginModal from "./components/modals/LoginModal"
import RegisterModal from "./components/modals/RegisterModal"

function App() {
  const showLoginModal = useSelector((state) => state.modal.activeModal) === "LOGIN"
  const showRegisterModal = useSelector((state) => state.modal.activeModal) === "REGISTER"

  const isShowingModal = showLoginModal || showRegisterModal;
  return (
    <div className="App">
      <div hidden={isShowingModal}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/accueil" element={<Home />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/fonctions" element={<Functions />} />
            <Route path="/demonstration" element={<Demos />} />
            <Route path="/tutoriels" element={<Tutos />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/accueil" element={<AdminHome />} />
            <Route path="/admin/utilisateurs" element={<AdminUser />} />
            <Route path="/admin/fonctions" element={<AdminFunctions />} />
            <Route path="/admin/tutoriels" element={<AdminTutos />} />
            <Route path="/admin/faq" element={<AdminFAQ />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Modal show={showLoginModal} modalContent={<LoginModal />} />
      <Modal show={showRegisterModal} modalContent={<RegisterModal />} />
    </div>
  );
}

export default App;

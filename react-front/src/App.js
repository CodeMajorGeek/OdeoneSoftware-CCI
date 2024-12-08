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
import Contact from "./routes/Contact"

import AdminAccueil from "./routes/admin/AdminAccueil"
import AdminUser from "./routes/admin/AdminUser"
import AdminFunctions from "./routes/admin/AdminFunctions"
import AdminFAQ from "./routes/admin/AdminFAQ"
import AdminTutos from "./routes/admin/AdminTutos"

import Modal from "./components/modals/Modal"
import LoginModal from "./components/modals/LoginModal"
import RegisterModal from "./components/modals/RegisterModal"

const adminMode = true

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [adminView, setAdminView] = useState(false)

  const isShowingModal = showLoginModal || showRegisterModal;

  return (
    <div className="App">
      <div hidden={isShowingModal}>
        <Header
          account={<Account setShowLoginModal={setShowLoginModal} setShowRegisterModal={setShowRegisterModal} />} admin={adminMode} adminView={adminView} setAdminView={setAdminView} />
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
            {adminView && <Route path="/admin" element={<AdminAccueil />} />}
            {adminView && <Route path="/admin/accueil" element={<AdminAccueil />} />}
            {adminView && <Route path="/admin/utilisateurs" element={<AdminUser />} />}
            {adminView && <Route path="/admin/fonctions" element={<AdminFunctions />} />}
            {adminView && <Route path="/admin/tutoriels" element={<AdminTutos />} />}
            {adminView && <Route path="/admin/faq" element={<AdminFAQ />} />}
          </Routes>
        </main>
        <Footer />
      </div>
      <Modal show={showLoginModal} setShow={setShowLoginModal} modalContent={<LoginModal />} />
      <Modal show={showRegisterModal} setShow={setShowRegisterModal} modalContent={<RegisterModal />} />
    </div>
  );
}

export default App;

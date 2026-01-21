
import React, { useState, useEffect } from 'react';
import { UserRole, Customer } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import CustomerDashboard from './components/CustomerDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import ManagerLogin from './components/ManagerLogin';

/**
 * Root Application component managing the global state for roles and data.
 */
const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.GUEST);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [isManagerLoginOpen, setIsManagerLoginOpen] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('guedes_fidelidade_data');
    if (saved) {
      try {
        setCustomers(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing saved data:", e);
      }
    }
  }, []);

  // Save data to localStorage whenever the customers list is updated
  useEffect(() => {
    localStorage.setItem('guedes_fidelidade_data', JSON.stringify(customers));
  }, [customers]);

  const handleCustomerLogin = (input: string) => {
    const normalizedInput = input.trim().toUpperCase();
    const found = customers.find(c => 
      c.plate.toUpperCase() === normalizedInput || 
      c.whatsapp.replace(/\D/g,'') === input.replace(/\D/g,'')
    );
    
    if (found) {
      setCurrentCustomer(found);
      setRole(UserRole.CUSTOMER);
    } else {
      alert("Cliente não encontrado. Por favor, verifique os dados informados.");
    }
  };

  const handleManagerLoginSuccess = () => {
    setRole(UserRole.MANAGER);
    setIsManagerLoginOpen(false);
  };

  const handleLogout = () => {
    setRole(UserRole.GUEST);
    setCurrentCustomer(null);
  };

  const handleHomeClick = () => {
    setRole(UserRole.GUEST);
    setCurrentCustomer(null);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-[#fecb0a] selection:text-black">
      <Header 
        role={role} 
        onManagerClick={() => setIsManagerLoginOpen(true)} 
        onLogout={handleLogout}
        onHomeClick={handleHomeClick}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        {role === UserRole.GUEST && (
          <Home onLogin={handleCustomerLogin} />
        )}

        {role === UserRole.CUSTOMER && currentCustomer && (
          <CustomerDashboard customer={currentCustomer} />
        )}

        {role === UserRole.MANAGER && (
          <ManagerDashboard customers={customers} setCustomers={setCustomers} />
        )}
      </main>

      <Footer />

      {isManagerLoginOpen && (
        <ManagerLogin 
          onSuccess={handleManagerLoginSuccess} 
          onClose={() => setIsManagerLoginOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;

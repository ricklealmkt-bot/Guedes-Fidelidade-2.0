
import React, { useState, useEffect } from 'react';
import { UserRole, Customer, Service } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import CustomerDashboard from './components/CustomerDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import ManagerLogin from './components/ManagerLogin';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.GUEST);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Load data from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('guedes_customers');
    if (saved) {
      setCustomers(JSON.parse(saved));
    } else {
      // Mock initial customer for demo
      const mock: Customer[] = [{
        id: '1',
        name: 'João Silva',
        whatsapp: '31999999999',
        vehicleModel: 'Honda Civic',
        plate: 'QPS-8964',
        birthDate: '1990-05-20',
        referralSource: 'Instagram',
        phone: '31999999999',
        favoriteTeam: 'Atlético MG',
        services: [
          { id: 's1', type: 'Lavagem Simples', price: 50, date: new Date().toISOString() }
        ],
        stamps: 1,
        totalServicesCount: 1
      }];
      setCustomers(mock);
      localStorage.setItem('guedes_customers', JSON.stringify(mock));
    }
  }, []);

  const saveCustomers = (updated: Customer[]) => {
    setCustomers(updated);
    localStorage.setItem('guedes_customers', JSON.stringify(updated));
  };

  const handleCustomerLogin = (idOrPlate: string) => {
    const found = customers.find(c => 
      c.plate.toUpperCase() === idOrPlate.toUpperCase() || 
      c.whatsapp.replace(/\D/g,'') === idOrPlate.replace(/\D/g,'')
    );
    if (found) {
      setCurrentCustomer(found);
      setRole(UserRole.CUSTOMER);
    } else {
      alert("Cliente não encontrado. Verifique os dados ou contate o administrador.");
    }
  };

  const handleManagerAccess = () => {
    setRole(UserRole.MANAGER);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setRole(UserRole.GUEST);
    setCurrentCustomer(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header 
        role={role} 
        onManagerClick={() => setIsLoginModalOpen(true)} 
        onLogout={handleLogout}
        onHomeClick={() => setRole(UserRole.GUEST)}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        {role === UserRole.GUEST && (
          <Home onLogin={handleCustomerLogin} />
        )}

        {role === UserRole.CUSTOMER && currentCustomer && (
          <CustomerDashboard customer={currentCustomer} />
        )}

        {role === UserRole.MANAGER && (
          <ManagerDashboard 
            customers={customers} 
            setCustomers={saveCustomers} 
          />
        )}
      </main>

      <Footer />

      {isLoginModalOpen && (
        <ManagerLogin 
          onSuccess={handleManagerAccess} 
          onClose={() => setIsLoginModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;

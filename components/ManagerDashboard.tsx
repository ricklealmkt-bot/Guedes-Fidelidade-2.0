
import React, { useState, useRef } from 'react';
import { Customer, Service, SERVICE_TYPES } from '../types';
import { Plus, Search, FileDown, FileUp, Edit2, Trash2, Calendar, DollarSign, UserPlus, X, Gift } from 'lucide-react';

interface ManagerDashboardProps {
  customers: Customer[];
  setCustomers: (customers: Customer[]) => void;
}

const ManagerDashboard: React.FC<ManagerDashboardProps> = ({ customers, setCustomers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // New Customer Form State
  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({
    name: '',
    whatsapp: '',
    vehicleModel: '',
    plate: '',
    birthDate: '',
    referralSource: '',
    phone: '',
    favoriteTeam: '',
    services: [],
    stamps: 0,
    totalServicesCount: 0
  });

  // New Service State
  const [newService, setNewService] = useState({
    type: SERVICE_TYPES[0],
    price: 0
  });

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.plate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const customerToAdd: Customer = {
      ...newCustomer as Customer,
      id: editingCustomer ? editingCustomer.id : Date.now().toString(),
      stamps: editingCustomer ? editingCustomer.stamps : 0,
      totalServicesCount: editingCustomer ? editingCustomer.totalServicesCount : 0,
      services: editingCustomer ? editingCustomer.services : []
    };

    if (editingCustomer) {
      setCustomers(customers.map(c => c.id === editingCustomer.id ? customerToAdd : c));
    } else {
      setCustomers([...customers, customerToAdd]);
    }

    setEditingCustomer(null);
    setNewCustomer({
      name: '', whatsapp: '', vehicleModel: '', plate: '', birthDate: '', referralSource: '', phone: '', favoriteTeam: ''
    });
    setIsCustomerModalOpen(false);
  };

  const handleAddService = () => {
    if (!selectedCustomer) return;

    const service: Service = {
      id: Date.now().toString(),
      type: newService.type,
      price: newService.price,
      date: new Date().toISOString()
    };

    const updatedCustomers = customers.map(c => {
      if (c.id === selectedCustomer.id) {
        // Lógica linear: O selo só aumenta se ainda não for 10
        let newStamps = c.stamps;
        if (newStamps < 10) {
            newStamps += 1;
        }
        
        return {
          ...c,
          services: [...c.services, service],
          stamps: newStamps,
          totalServicesCount: c.totalServicesCount + 1
        };
      }
      return c;
    });

    setCustomers(updatedCustomers);
    setIsServiceModalOpen(false);
    setSelectedCustomer(null);
    setNewService({ type: SERVICE_TYPES[0], price: 0 });
  };

  const handleRedeemPrize = (customer: Customer) => {
    if (window.confirm(`Confirmar resgate do prêmio de GERAL COMPLETA para ${customer.name}? O cartão voltará a zero para nova contagem.`)) {
      const updatedCustomers = customers.map(c => {
        if (c.id === customer.id) {
          // Adiciona registro de resgate no histórico para manter a linearidade/auditoria
          const redemption: Service = {
            id: Date.now().toString(),
            type: "RESGATE DE PRÊMIO: Geral Completa",
            price: 0,
            date: new Date().toISOString()
          };
          
          return {
            ...c,
            services: [...c.services, redemption],
            stamps: 0 // Reinicia a contagem dos selos
          };
        }
        return c;
      });
      setCustomers(updatedCustomers);
      alert("Prêmio resgatado com sucesso! Contagem reiniciada.");
    }
  };

  const handleDeleteCustomer = (id: string) => {
    if (window.confirm("Deseja realmente excluir este cliente?")) {
      setCustomers(customers.filter(c => c.id !== id));
    }
  };

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(customers));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `guedes_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const imported = JSON.parse(content);
          if (Array.isArray(imported)) {
            if (window.confirm("Isso substituirá todos os dados atuais. Continuar?")) {
              setCustomers(imported);
              alert("Dados importados com sucesso!");
            }
          }
        } catch (err) {
          alert("Erro ao importar arquivo. Certifique-se que é um backup válido.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Actions */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl font-black uppercase tracking-tighter">Gestão de Clientes</h2>
        <div className="flex flex-wrap justify-center gap-2">
          <button 
            onClick={() => { setEditingCustomer(null); setIsCustomerModalOpen(true); }}
            className="flex items-center gap-2 bg-[#fecb0a] text-black px-6 py-2 rounded-full font-bold text-sm hover:opacity-90"
          >
            <UserPlus size={18} /> NOVO CLIENTE
          </button>
          <button 
            onClick={exportData}
            className="flex items-center gap-2 bg-gray-900 text-gray-300 border border-gray-800 px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-800"
          >
            <FileDown size={18} /> BACKUP
          </button>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-gray-900 text-gray-300 border border-gray-800 px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-800"
          >
            <FileUp size={18} /> IMPORTAR
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImport} 
            className="hidden" 
            accept=".json"
          />
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500">
          <Search size={20} />
        </div>
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nome ou placa..."
          className="w-full bg-[#111] border border-gray-800 rounded-2xl py-4 pl-12 pr-4 font-bold outline-none focus:border-[#fecb0a] transition-all"
        />
      </div>

      {/* Table */}
      <div className="bg-[#111] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-800 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                <th className="px-6 py-4">Cliente / Veículo</th>
                <th className="px-6 py-4">WhatsApp</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Selos</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-900">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-600 italic">Nenhum cliente cadastrado.</td>
                </tr>
              ) : (
                filteredCustomers.map(customer => (
                  <tr key={customer.id} className="hover:bg-black/40 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                         {customer.stamps === 10 && <Gift size={18} className="text-[#fecb0a] animate-pulse" />}
                         <div>
                            <p className="font-bold">{customer.name}</p>
                            <p className="text-xs text-[#fecb0a] font-black">{customer.plate} - {customer.vehicleModel}</p>
                         </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">{(customer as any).phone || customer.whatsapp}</td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] bg-gray-900 text-gray-400 px-2 py-1 rounded-full font-bold">
                        {customer.totalServicesCount} SERV.
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-2 h-2 rounded-full ${i < customer.stamps ? 'bg-[#fecb0a]' : 'bg-gray-800'} ${customer.stamps === 10 ? 'shadow-[0_0_5px_#fecb0a]' : ''}`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                        {customer.stamps === 10 ? (
                          <button 
                            onClick={() => handleRedeemPrize(customer)}
                            title="Resgatar Prêmio (Geral Completa)"
                            className="p-2 bg-[#fecb0a] text-black hover:scale-105 rounded-xl transition-all shadow-[0_0_10px_rgba(254,203,10,0.3)]"
                          >
                            <Gift size={18} />
                          </button>
                        ) : (
                          <button 
                            onClick={() => { setSelectedCustomer(customer); setIsServiceModalOpen(true); }}
                            title="Lançar Serviço"
                            className="p-2 bg-green-600/10 text-green-500 hover:bg-green-600/20 rounded-xl transition-all"
                          >
                            <Plus size={18} />
                          </button>
                        )}
                        <button 
                          onClick={() => { setEditingCustomer(customer); setNewCustomer(customer); setIsCustomerModalOpen(true); }}
                          className="p-2 bg-blue-600/10 text-blue-500 hover:bg-blue-600/20 rounded-xl transition-all"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeleteCustomer(customer.id)}
                          className="p-2 bg-red-600/10 text-red-500 hover:bg-red-600/20 rounded-xl transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Modal */}
      {isCustomerModalOpen && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4">
          <div className="bg-[#111] border border-gray-800 w-full max-w-2xl rounded-3xl p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black uppercase tracking-tighter">
                {editingCustomer ? 'Editar Cliente' : 'Cadastrar Novo Cliente'}
              </h3>
              <button onClick={() => setIsCustomerModalOpen(false)} className="p-2 text-gray-500 hover:text-white"><X /></button>
            </div>
            <form onSubmit={handleAddCustomer} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Nome Completo</label>
                <input required value={newCustomer.name} onChange={e => setNewCustomer({...newCustomer, name: e.target.value})} className="w-full bg-black border border-gray-800 p-3 rounded-xl focus:border-[#fecb0a] outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">WhatsApp</label>
                <input required value={newCustomer.whatsapp} onChange={e => setNewCustomer({...newCustomer, whatsapp: e.target.value})} className="w-full bg-black border border-gray-800 p-3 rounded-xl focus:border-[#fecb0a] outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Modelo do Veículo</label>
                <input required value={newCustomer.vehicleModel} onChange={e => setNewCustomer({...newCustomer, vehicleModel: e.target.value})} className="w-full bg-black border border-gray-800 p-3 rounded-xl focus:border-[#fecb0a] outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Placa</label>
                <input required value={newCustomer.plate} onChange={e => setNewCustomer({...newCustomer, plate: e.target.value.toUpperCase()})} className="w-full bg-black border border-gray-800 p-3 rounded-xl focus:border-[#fecb0a] outline-none font-bold uppercase" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Data de Nascimento</label>
                <input type="date" required value={newCustomer.birthDate} onChange={e => setNewCustomer({...newCustomer, birthDate: e.target.value})} className="w-full bg-black border border-gray-800 p-3 rounded-xl focus:border-[#fecb0a] outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Time do Coração</label>
                <input value={newCustomer.favoriteTeam} onChange={e => setNewCustomer({...newCustomer, favoriteTeam: e.target.value})} className="w-full bg-black border border-gray-800 p-3 rounded-xl focus:border-[#fecb0a] outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Como nos conheceu?</label>
                <select value={newCustomer.referralSource} onChange={e => setNewCustomer({...newCustomer, referralSource: e.target.value})} className="w-full bg-black border border-gray-800 p-3 rounded-xl focus:border-[#fecb0a] outline-none text-gray-400">
                   <option value="">Selecione...</option>
                   <option value="Instagram">Instagram</option>
                   <option value="WhatsApp">WhatsApp</option>
                   <option value="Indicação">Indicação</option>
                   <option value="Passou na porta">Passou na porta</option>
                   <option value="Google">Google</option>
                </select>
              </div>
              <div className="md:col-span-2 pt-4">
                <button type="submit" className="w-full bg-[#fecb0a] text-black py-4 rounded-xl font-black uppercase tracking-tighter hover:opacity-90">
                  {editingCustomer ? 'Salvar Alterações' : 'Confirmar Cadastro'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Service Modal */}
      {isServiceModalOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4">
          <div className="bg-[#111] border border-gray-800 w-full max-w-md rounded-3xl p-8 space-y-6">
            <div className="space-y-1">
               <h3 className="text-2xl font-black uppercase tracking-tighter">Lançar Selo</h3>
               <p className="text-xs text-[#fecb0a] font-bold">Cliente: {selectedCustomer.name}</p>
            </div>
            
            <div className="space-y-4">
               <div className="space-y-1">
                 <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Tipo de Serviço</label>
                 <select 
                    value={newService.type}
                    onChange={e => setNewService({...newService, type: e.target.value})}
                    className="w-full bg-black border border-gray-800 p-3 rounded-xl focus:border-[#fecb0a] outline-none"
                 >
                   {SERVICE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                 </select>
               </div>
               <div className="space-y-1">
                 <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Valor Pago (R$)</label>
                 <div className="relative">
                   <div className="absolute inset-y-0 left-4 flex items-center text-gray-500"><DollarSign size={16}/></div>
                   <input 
                      type="number"
                      value={newService.price}
                      onChange={e => setNewService({...newService, price: Number(e.target.value)})}
                      className="w-full bg-black border border-gray-800 p-3 pl-10 rounded-xl focus:border-[#fecb0a] outline-none font-bold"
                   />
                 </div>
               </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setIsServiceModalOpen(false)}
                className="flex-1 border border-gray-800 text-gray-500 py-3 rounded-xl font-bold hover:text-white"
              >
                CANCELAR
              </button>
              <button 
                onClick={handleAddService}
                className="flex-[2] bg-[#fecb0a] text-black py-3 rounded-xl font-black uppercase tracking-tighter hover:opacity-90"
              >
                CONFIRMAR SELO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerDashboard;

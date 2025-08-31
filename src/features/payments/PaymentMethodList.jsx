import React, { useEffect, useState } from 'react';
import DataTable from '../../components/common/DataTable';
import PaymentMethodForm from './PaymentMethodForm';
import { listPaymentMethods, removePaymentMethod } from './paymentService';

const PaymentMethodList = () => {
  const [items, setItems] = useState([]);
  const reload = () => setItems(listPaymentMethods());
  useEffect(() => { reload(); }, []);

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'provider', label: 'Provider' },
    { key: 'fee', label: 'Fee (%)' },
    { key: 'enabled', label: 'Status', render: v => (
      <span className={`px-2 py-1 rounded-full text-xs ${v?'bg-green-100 text-green-700':'bg-gray-100 text-gray-700'}`}>{v?'Enabled':'Disabled'}</span>
    )}
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Methods</h1>
      <PaymentMethodForm onSaved={reload} />
      <DataTable columns={columns} data={items} onDelete={(row) => { removePaymentMethod(row.id); reload(); }} />
    </div>
  );
};

export default PaymentMethodList;

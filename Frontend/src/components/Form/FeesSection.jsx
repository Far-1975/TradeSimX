// import React from 'react';
// import { DollarSign } from 'lucide-react';



// export function FeesSection({ data, onChange }) {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//       <div className="flex items-center gap-2 mb-4">
//         <DollarSign className="w-5 h-5 text-blue-600" />
//         <h2 className="text-xl font-semibold text-gray-900">Fees & Slippage</h2>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label htmlFor="tradingFee" className="block text-sm font-medium text-gray-700">
//             Trading Fee (%)
//           </label>
//           <input
//             type="number"
//             id="tradingFee"
//             value={data.tradingFee}
//             onChange={(e) => onChange({ ...data, tradingFee:(e.target.value) })}
//             step="0.01"
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             placeholder="0.1"
//           />
//         </div>

//         <div>
//           <label htmlFor="slippage" className="block text-sm font-medium text-gray-700">
//             Slippage (%)
//           </label>
//           <input
//             type="number"
//             id="slippage"
//             value={data.slippage}
//             onChange={(e) => onChange({ ...data, slippage:(e.target.value) })}
//             step="0.01"
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//             placeholder="0.05"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
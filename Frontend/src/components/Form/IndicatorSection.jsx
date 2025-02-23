// import React from 'react';
// import { Settings } from 'lucide-react';
// import { GiCancel } from "react-icons/gi";
// import { motion } from 'framer-motion';

// const indicators = [
//   { id: 'ma', name: 'Moving Average', params: ['period', 'type'] },
//   { id: 'rsi', name: 'RSI', params: ['period'] },
//   { id: 'macd', name: 'MACD', params: ['fastPeriod', 'slowPeriod', 'signalPeriod'] },
//   { id: 'bb', name: 'Bollinger Bands', params: ['period', 'stdDev'] },
//   { id: 'ema', name: 'EMA', params: ['period'] },
//   { id: 'stoch', name: 'Stochastic', params: ['kPeriod', 'dPeriod', 'smooth'] }
// ];

// const comparisonOperators = [
//   { value: 'crosses_above', label: 'Crosses Above' },
//   { value: 'crosses_below', label: 'Crosses Below' },
//   { value: 'greater_than', label: 'Greater Than' },
//   { value: 'less_than', label: 'Less Than' },
//   { value: 'equals', label: 'Equals' }
// ];

// export function IndicatorSection({ data, onChange }) {
//   const addIndicator = () => {
//     const newIndicator = {
//       id: indicators[0].id,
//       compareWith: indicators[1].id,
//       operator: comparisonOperators[0].value,
//       conditions: []
//     };
//     onChange([...data, newIndicator]);
//   };

//   const addCondition = (index) => {
//     const newData = [...data];
//     newData[index].conditions.push({
//       id: indicators[0].id,
//       compareWith: indicators[1].id,
//       operator: comparisonOperators[0].value,
//     });
//     onChange(newData);
//   };

//   const removeCondition = (index, conditionIndex) => {
//     const newData = [...data];
//     newData[index].conditions.splice(conditionIndex, 1);
//     onChange(newData);
//   };

//   const updateIndicator = (index, updates) => {
//     const newData = [...data];
//     newData[index] = { ...newData[index], ...updates };
//     onChange(newData);
//   };

//   const updateCondition = (index, conditionIndex, updates) => {
//     const newData = [...data];
//     newData[index].conditions[conditionIndex] = { 
//       ...newData[index].conditions[conditionIndex], 
//       ...updates 
//     };
//     onChange(newData);
//   };

//   const removeIndicator = (index) => {
//     const newData = data.filter((_, i) => i !== index);
//     onChange(newData);
//   };

//   const renderDropdown = (value, onChange, options) => (
//     <select
//       value={value}
//       onChange={onChange}
//       className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//     >
//       {options.map((option) => (
//         <option key={option.value || option.id} value={option.value || option.id}>
//           {option.label || option.name}
//         </option>
//       ))}
//     </select>
//   );

//   return (
//     <div className="bg-white p-6  rounded-lg shadow-sm border border-gray-200">
//       <div className="flex items-center  gap-2 mb-4">
//         <Settings className="w-5 h-5 text-blue-600" />
//         <h2 className="text-xl font-semibold text-gray-900">Entry Point</h2>
//       </div>

//       <div className="space-y-6">
//         {data.map((indicator, index) => (
//           <motion.div
//             key={index}
//             className="p-4 border border-gray-200 rounded-md"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-medium">Indicator Comparison {index + 1}</h3>
//               <button
//                 type="button"
//                 onClick={() => removeIndicator(index)}
//                 className="text-red-600 hover:text-red-700"
//               >
//                 Remove
//               </button>
//             </div>

//             <div className="grid gap-4">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {/* First Indicator */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">First Indicator</label>
//                   {renderDropdown(
//                     indicator.id,
//                     (e) => updateIndicator(index, { id: e.target.value }),
//                     indicators
//                   )}
//                 </div>

//                 {/* Comparison Operator */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
//                   {renderDropdown(
//                     indicator.operator,
//                     (e) => updateIndicator(index, { operator: e.target.value }),
//                     comparisonOperators
//                   )}
//                 </div>

//                 {/* Second Indicator */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Second Indicator</label>
//                   {renderDropdown(
//                     indicator.compareWith,
//                     (e) => updateIndicator(index, { compareWith: e.target.value }),
//                     indicators
//                   )}
//                 </div>
//               </div>

//               {/* Conditions */}
//               <div className="mt-4">
//                 {indicator.conditions.map((condition, conditionIndex) => (
//                   <React.Fragment key={conditionIndex}>
//                     <motion.div
//                       className="flex items-center gap-4 mb-2"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       {/* First Indicator */}
//                       <div className="flex-1">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">First Indicator</label>
//                         {renderDropdown(
//                           condition.id,
//                           (e) => updateCondition(index, conditionIndex, { id: e.target.value }),
//                           indicators
//                         )}
//                       </div>

//                       {/* Comparison Operator */}
//                       <div className="flex-1">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
//                         {renderDropdown(
//                           condition.operator,
//                           (e) => updateCondition(index, conditionIndex, { operator: e.target.value }),
//                           comparisonOperators
//                         )}
//                       </div>

//                       {/* Second Indicator */}
//                       <div className="flex-1">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Second Indicator</label>
//                         {renderDropdown(
//                           condition.compareWith,
//                           (e) => updateCondition(index, conditionIndex, { compareWith: e.target.value }),
//                           indicators
//                         )}
//                       </div>

//                       {/* Remove Condition Button */}
//                       <button
//                         type="button"
//                         onClick={() => removeCondition(index, conditionIndex)}
//                         className="text-red-600 hover:text-red-700"
//                       >
//                         <GiCancel className="w-5 h-5" />
//                       </button>
//                     </motion.div>

//                     {/* Add 'AND' between conditions */}
//                     {conditionIndex < indicator.conditions.length - 1 && (
//                       <div className="flex items-center justify-center my-2">
//                         <span className="px-4 py-1 bg-gray-100 rounded-full text-gray-700 font-medium">
//                           AND
//                         </span>
//                       </div>
//                     )}
//                   </React.Fragment>
//                 ))}

//                 {/* Add Condition Button */}
//                 <button
//                   type="button"
//                   onClick={() => addCondition(index)}
//                   className="py-2 px-4 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
//                 >
//                   Add Condition
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         ))}

//         <motion.button
//           type="button"
//           onClick={addIndicator}
//           className="w-full py-2 px-4 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
//           initial={{ scale: 0.95 }}
//           animate={{ scale: 1 }}
//           exit={{ scale: 0.95 }}
//           transition={{ duration: 0.2 }}
//         >
//           Add Indicator Comparison
//         </motion.button>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { motion } from 'framer-motion';
import { GiCancel } from "react-icons/gi";

export function ConditionCard({
  condition,
  index,
  conditionIndex,
  onUpdate,
  onRemove,
  onToggleComparisonType,
  renderDropdown,
  indicators,
  comparisonOperators
}) {
  return (
    <motion.div
      className="flex items-center gap-4 mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">First Indicator</label>
        {renderDropdown(
          condition.id,
          (e) => onUpdate({ id: e.target.value }),
          indicators
        )}
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
        {renderDropdown(
          condition.operator,
          (e) => onUpdate({ operator: e.target.value }),
          comparisonOperators
        )}
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <label className="block text-sm font-medium text-gray-700">Compare With</label>
          <button
            type="button"
            onClick={() => onToggleComparisonType(index, conditionIndex)}
            className="text-xs text-blue-600 hover:text-blue-700"
          >
            Switch to {condition.useValue ? 'Indicator' : 'Value'}
          </button>
        </div>
        {condition.useValue ? (
          <input
            type="number"
            value={condition.value}
            onChange={(e) => onUpdate({ value: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter value"
            step="any"
          />
        ) : (
          renderDropdown(
            condition.compareWith,
            (e) => onUpdate({ compareWith: e.target.value }),
            indicators
          )
        )}
      </div>

      <button
        type="button"
        onClick={() => onRemove(index, conditionIndex)}
        className="text-red-600 hover:text-red-700 mt-6"
      >
        <GiCancel className="w-5 h-5" />
      </button>
    </motion.div>
  );
} 
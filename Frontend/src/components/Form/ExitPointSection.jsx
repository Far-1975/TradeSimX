import React, { useState } from 'react';
import { Settings, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { CustomIndicatorModal } from './ExitPoint/CustomIndicatorModal';
import { ConditionCard } from './ExitPoint/ConditionCard';
import { Summary } from './ExitPoint/Summary';
import { constants } from './constants';

const { indicators, comparisonOperators, arithmeticOperators } = constants;

export function ExitPointSection({ data, onChange, customIndicators, onCustomIndicatorChange }) {
  const [showCustomIndicator, setShowCustomIndicator] = useState(false);
  const [customIndicator, setCustomIndicator] = useState({
    name: '',
    firstIndicator: '',
    operator: '+',
    secondIndicator: ''
  });

  const addIndicator = () => {
    const newIndicator = {
      id: indicators[0].id,
      compareWith: indicators[1].id,
      operator: comparisonOperators[0].value,
      useValue: false,
      value: '',
      conditions: []
    };
    onChange([...data, newIndicator]);
  };

  const addCondition = (index) => {
    const newData = [...data];
    newData[index].conditions.push({
      id: indicators[0].id,
      compareWith: indicators[1].id,
      operator: comparisonOperators[0].value,
      useValue: false,
      value: ''
    });
    onChange(newData);
  };

  const removeCondition = (index, conditionIndex) => {
    const newData = [...data];
    newData[index].conditions.splice(conditionIndex, 1);
    onChange(newData);
  };

  const updateIndicator = (index, updates) => {
    const newData = [...data];
    newData[index] = { ...newData[index], ...updates };
    onChange(newData);
  };

  const updateCondition = (index, conditionIndex, updates) => {
    const newData = [...data];
    newData[index].conditions[conditionIndex] = { 
      ...newData[index].conditions[conditionIndex], 
      ...updates 
    };
    onChange(newData);
  };

  const removeIndicator = (index) => {
    const newData = data.filter((_, i) => i !== index);
    onChange(newData);
  };

  const toggleComparisonType = (index) => {
    const newData = [...data];
    newData[index] = { 
      ...newData[index], 
      useValue: !newData[index].useValue,
      value: newData[index].useValue ? '' : newData[index].value,
      compareWith: newData[index].useValue ? indicators[1].id : newData[index].compareWith,
    };
    onChange(newData);
  };

  const toggleConditionComparisonType = (index, conditionIndex) => {
    const newData = [...data];
    const condition = newData[index].conditions[conditionIndex];
    condition.useValue = !condition.useValue;
    condition.value = condition.useValue ? '' : condition.value;
    condition.compareWith = condition.useValue ? indicators[1].id : condition.compareWith;
    onChange(newData);
  };

  const renderDropdown = (value, onChange, options) => (
    <select
      value={value}
      onChange={onChange}
      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    >
      <optgroup label="Standard Indicators">
        {options.map((option) => (
          <option key={option.value || option.id} value={option.value || option.id}>
            {option.label || option.name}
          </option>
        ))}
      </optgroup>
      {customIndicators.length > 0 && (
        <optgroup label="Custom Indicators">
          {customIndicators.map((indicator) => (
            <option key={indicator.id} value={indicator.id}>
              {indicator.name}
            </option>
          ))}
        </optgroup>
      )}
    </select>
  );

  const handleCreateIndicator = () => {
    if (!customIndicator.name || !customIndicator.firstIndicator || !customIndicator.secondIndicator) {
      return;
    }

    const newCustomIndicator = {
      id: customIndicator.name,
      name: customIndicator.name,
      formula: `${customIndicator.firstIndicator} ${customIndicator.operator} ${customIndicator.secondIndicator}`,
      firstIndicator: customIndicator.firstIndicator,
      operator: customIndicator.operator,
      secondIndicator: customIndicator.secondIndicator
    };

    onCustomIndicatorChange([...customIndicators, newCustomIndicator]);
    
    setCustomIndicator({
      name: '',
      firstIndicator: '',
      operator: '+',
      secondIndicator: ''
    });
    setShowCustomIndicator(false);
  };

  const handleAddCustomIndicator = (indicator) => {
    onCustomIndicatorChange([...customIndicators, {
      name: indicator.name,
      op1: indicator.firstIndicator || 'high',
      op2: indicator.secondIndicator || 'low',
      oper: indicator.operator || '-'
    }]);
  };

  const generateSummary = (indicator) => {
    const getIndicatorName = (id) => {
      const standardIndicator = indicators.find(i => i.id === id);
      if (standardIndicator) return standardIndicator.name;
      
      const customIndicator = customIndicators.find(i => i.id === id);
      if (customIndicator) return customIndicator.name;
      
      return id;
    };

    const getOperatorText = (op) => {
      switch(op) {
        case 'greater_than': return 'is greater than';
        case 'less_than': return 'is less than';
        case 'equals': return 'equals';
        case 'crosses_above': return 'crosses above';
        case 'crosses_below': return 'crosses below';
        default: return op;
      }
    };

    const mainCondition = indicator.useValue
      ? `${getIndicatorName(indicator.id)} ${getOperatorText(indicator.operator)} ${indicator.value}`
      : `${getIndicatorName(indicator.id)} ${getOperatorText(indicator.operator)} ${getIndicatorName(indicator.compareWith)}`;

    const additionalConditions = indicator.conditions.map(condition => {
      return condition.useValue
        ? `${getIndicatorName(condition.id)} ${getOperatorText(condition.operator)} ${condition.value}`
        : `${getIndicatorName(condition.id)} ${getOperatorText(condition.operator)} ${getIndicatorName(condition.compareWith)}`;
    });

    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
        <p className="text-sm text-gray-600 leading-relaxed">
          When <span className="font-medium text-gray-800">{mainCondition}</span>
          {additionalConditions.length > 0 && additionalConditions.map((condition, index) => (
            <React.Fragment key={index}>
              <span className="text-gray-500"> AND </span>
              <span className="font-medium text-gray-800">{condition}</span>
            </React.Fragment>
          ))}
        </p>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Exit Point</h2>
      </div>

      <div className="space-y-6">
        {data.map((indicator, index) => (
          <React.Fragment key={index}>
            <motion.div
              className="p-4 border border-gray-200 rounded-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Condition  {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeIndicator(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>

              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Indicator</label>
                    {renderDropdown(
                      indicator.id,
                      (e) => updateIndicator(index, { id: e.target.value }),
                      indicators
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                    {renderDropdown(
                      indicator.operator,
                      (e) => updateIndicator(index, { operator: e.target.value }),
                      comparisonOperators
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-700">Compare With</label>
                      <button
                        type="button"
                        onClick={() => toggleComparisonType(index)}
                        className="text-xs text-blue-600 hover:text-blue-700"
                      >
                        Switch to {indicator.useValue ? 'Indicator' : 'Value'}
                      </button>
                    </div>
                    {indicator.useValue ? (
                      <input
                        type="number"
                        value={indicator.value}
                        onChange={(e) => updateIndicator(index, { value: e.target.value })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter value"
                        step="any"
                      />
                    ) : (
                      renderDropdown(
                        indicator.compareWith,
                        (e) => updateIndicator(index, { compareWith: e.target.value }),
                        indicators
                      )
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  {indicator.conditions.length > 0 && (
                    <div className="flex items-center my-4">
                      <div className="flex-grow border-t border-gray-200"></div>
                      <span className="mx-4 px-4 py-1 bg-gray-100 rounded-full text-gray-700 font-medium text-sm">
                        AND
                      </span>
                      <div className="flex-grow border-t border-gray-200"></div>
                    </div>
                  )}

                  {indicator.conditions.map((condition, conditionIndex) => (
                    <React.Fragment key={conditionIndex}>
                      <ConditionCard
                        condition={condition}
                        index={index}
                        conditionIndex={conditionIndex}
                        onUpdate={(updates) => updateCondition(index, conditionIndex, updates)}
                        onRemove={removeCondition}
                        onToggleComparisonType={toggleConditionComparisonType}
                        renderDropdown={renderDropdown}
                        indicators={indicators}
                      />

                      {conditionIndex < indicator.conditions.length - 1 && (
                        <div className="flex items-center my-4">
                          <div className="flex-grow border-t border-gray-200"></div>
                          <span className="mx-4 px-4 py-1 bg-gray-100 rounded-full text-gray-700 font-medium text-sm">
                            AND
                          </span>
                          <div className="flex-grow border-t border-gray-200"></div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}

                  <button
                    type="button"
                    onClick={() => addCondition(index)}
                    className="py-2 px-4 border border-green-600 text-green-600 rounded-md hover:bg-green-50"
                  >
                    Add Sub Condition
                  </button>

                  <div className="mt-4">
                    {generateSummary(indicator)}
                  </div>
                </div>
              </div>
            </motion.div>

            {index < data.length - 1 && (
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="mx-4 px-6 py-1 bg-orange-100 rounded-full text-orange-700 font-medium text-sm">
                  OR
                </span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>
            )}
          </React.Fragment>
        ))}

        <motion.button
          type="button"
          onClick={() => setShowCustomIndicator(true)}
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-600 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Plus className="w-5 h-5" />
          Add Custom Indicator
        </motion.button>

        <motion.button
          type="button"
          onClick={addIndicator}
          className="w-full py-2 px-4 border border-green-600 text-green-600 rounded-md hover:bg-green-50"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          Add Condition
        </motion.button>

        <CustomIndicatorModal 
          showModal={showCustomIndicator}
          onClose={() => setShowCustomIndicator(false)}
          customIndicator={customIndicator}
          setCustomIndicator={setCustomIndicator}
          onCreateIndicator={handleCreateIndicator}
          indicators={indicators}
          arithmeticOperators={arithmeticOperators}
        />

        {data.length > 0 && (
          <Summary 
            data={data}
            indicators={indicators}
            customIndicators={customIndicators}
          />
        )}

      </div>
    </div>
  );
} 
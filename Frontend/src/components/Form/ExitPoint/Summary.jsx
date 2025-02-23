import React from 'react';

export function Summary({ data, indicators, customIndicators }) {
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

  const getConditionText = (indicator) => {
    const mainCondition = indicator.useValue
      ? `${getIndicatorName(indicator.id)} ${getOperatorText(indicator.operator)} ${indicator.value}`
      : `${getIndicatorName(indicator.id)} ${getOperatorText(indicator.operator)} ${getIndicatorName(indicator.compareWith)}`;

    const additionalConditions = indicator.conditions.map(condition => {
      return condition.useValue
        ? `${getIndicatorName(condition.id)} ${getOperatorText(condition.operator)} ${condition.value}`
        : `${getIndicatorName(condition.id)} ${getOperatorText(condition.operator)} ${getIndicatorName(condition.compareWith)}`;
    });

    return (
      <span className="font-medium text-gray-800">
        (Exit When {mainCondition}
        {additionalConditions.length > 0 && additionalConditions.map((condition, index) => (
          <React.Fragment key={index}>
            <span className="text-gray-500"> AND </span>
            {condition}
          </React.Fragment>
        ))}
        )
      </span>
    );
  };

  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
      <h4 className="text-sm font-semibold text-gray-700 mb-3">Complete Strategy Summary:</h4>
      <p className="text-sm text-gray-600 leading-relaxed">
        {data.map((indicator, index) => (
          <React.Fragment key={index}>
            {getConditionText(indicator)}
            {index < data.length - 1 && (
              <span className="text-orange-500 font-medium mx-2">OR</span>
            )}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
} 
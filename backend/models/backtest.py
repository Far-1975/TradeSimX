from datetime import datetime
from bson import ObjectId

class BacktestModel:
    def __init__(self, db):
        self.collection = db.backtests

    def create_backtest(self, user_id, input_params, results, report_id, insights):
        """Store backtest results in MongoDB"""
        backtest = {
            "user_id": user_id,
            "input_params": input_params,
            "results": results,
            "report_id": report_id,
            "insights": insights,
            "created_at": datetime.utcnow(),
            "status": "completed"
        }
        
        result = self.collection.insert_one(backtest)
        return str(result.inserted_id)

    def get_backtest(self, backtest_id):
        """Get backtest by ID"""
        try:
            result = self.collection.find_one({"_id": ObjectId(backtest_id)})
            if result:
                result["_id"] = str(result["_id"])
            return result
        except Exception as e:
            print(f"Error getting backtest: {e}")
            return None

    def get_user_backtests(self, user_id):
        """Get all backtests for a user"""
        try:
            cursor = self.collection.find({"user_id": user_id})
            backtests = []
            for doc in cursor:
                doc["_id"] = str(doc["_id"])
                backtests.append(doc)
            return backtests
        except Exception as e:
            print(f"Error getting user backtests: {e}")
            return [] 
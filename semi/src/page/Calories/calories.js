import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // useNavigate 추가
import './calories.css';

const Calories = ({ userId }) => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [meals, setMeals] = useState({
    아침: [],
    점심: [],
    저녁: [],
  });
  const [selectedFood, setSelectedFood] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8080/foods')
      .then((response) => {
        setFoods(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching foods", error);
        setIsLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearch(keyword);
    if (keyword.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filtered = foods.filter((food) =>
      food.name.includes(keyword)
    );
    setSearchResults(filtered);
  };

  const handleSelectFood = (food) => {
    setSelectedFood(food);
  };

  const addFoodToMeal = (meal, food) => {
    setMeals((prev) => ({
      ...prev,
      [meal]: [...prev[meal], food],
    }));
    setSearch("");
    setSearchResults([]);
    setSelectedFood(null);  // 음식을 추가 후 선택된 음식 상태 초기화
  };

  const saveFoodLog = () => {
    const allFoods = Object.entries(meals).flatMap(([mealName, foods]) =>
      foods.map((food) => ({
        userId: userId, // 로그인된 사용자 ID 사용
        foodId: food.foodId,
        quantity: 1,
        totalCalories: food.calories,
        mealTime: mealName,
        logDate: new Date(),
      }))
    );

    if (allFoods.length === 0) return;

    axios
      .post('http://localhost:8080/food-logs/bulk', allFoods)
      .then((response) => {
        console.log('전체 식사 저장 성공', response.data);
        alert('저장되었습니다!');  // 저장 성공 후 알림

        // 저장 후 상태 초기화
        setMeals({
          아침: [],
          점심: [],
          저녁: [],
        });
        setSelectedFood(null);  // "선택된 음식" 초기화
      })
      .catch((error) => {
        console.error('전체 식사 저장 실패', error);
      });
  };

  const removeFoodFromMeal = (meal, index) => {
    setMeals((prev) => ({
      ...prev,
      [meal]: prev[meal].filter((_, i) => i !== index),
    }));
  };

  const getTotalCalories = () => {
    // 아침, 점심, 저녁의 칼로리를 합산
    const totalCalories = Object.values(meals)
      .flat()
      .reduce((total, food) => total + food.calories, 0);
    return totalCalories;
  };

  return (
    <div className="calories-container">
      <h2>섭취 칼로리</h2>

      <input
        type="text"
        placeholder="음식 검색"
        value={search}
        onChange={handleSearch}
      />

      {isLoading ? (
        <p>로딩 중...</p>
      ) : (
        <div>
          {searchResults.map((food, idx) => (
            <div className="search-result" key={idx} onClick={() => handleSelectFood(food)}>
              <span>{food.name} - {food.calories} kcal</span>
              <div className="search-result-buttons">
                {["아침", "점심", "저녁"].map((meal) => (
                  <button
                    key={meal}
                    onClick={() => addFoodToMeal(meal, food)}
                  >
                    {meal}에 추가
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedFood && (
        <div className="selected-food-container">
          <h3>선택된 음식: {selectedFood.name}</h3>
          <p>칼로리: {selectedFood.calories} kcal</p>
          <p>카테고리: {selectedFood.category}</p>
          <p>단위: {selectedFood.unit}</p>
        </div>
      )}

      <div className="meal-grid">
        {["아침", "점심", "저녁"].map((meal) => (
          <div className="meal-square" key={meal}>
            <h3>{meal}</h3>
            <div className="meal-items">
              {meals[meal].map((food, idx) => (
                <div key={idx} className="food-item">
                  <span>{food.name}</span>
                  <button
                    className="delete-button"
                    onClick={() => removeFoodFromMeal(meal, idx)}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="meal-square total-calories-box">
          총 칼로리: {getTotalCalories()} kcal
        </div>
      </div>

      {Object.values(meals).some((meal) => meal.length > 0) && (
        <button onClick={saveFoodLog} className="save-button">전체 저장하기</button>
      )}
    </div>
  );
};

export default Calories;

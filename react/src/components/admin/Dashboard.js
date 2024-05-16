import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../../styles/dashboard.css';

const SVG_WIDTH = 600;
const SVG_HEIGHT = 500;

function Dashboard() {
  const history = useHistory();
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [returnCount, setReturnCount] = useState(0);
  const [totalOrderItemsPrice, setTotalOrderItemsPrice] = useState(0);
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });

  const [dailyRevenueData, setDailyRevenueData] = useState([]);


  useEffect(() => {
    document.title = 'Dashboard';

    fetchData();
    fetchDailyRevenueData(); // Fetch your daily revenue data
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/admin/dashboard`);
      const {
        status,
        userCount,
        productCount,
        categoryCount,
        orderCount,
        returnCount,
        userInfo,
        totalOrderItemsPrice,
      } = response.data;

      if (status === 200) {
        setUserCount(userCount);
        setProductCount(productCount);
        setCategoryCount(categoryCount);
        setOrderCount(orderCount);
        setReturnCount(returnCount);
        setTotalOrderItemsPrice(totalOrderItemsPrice);
        setUserInfo(userInfo);
      } else {
        console.error('API returned an error:', response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const navigateToUsersPage = () => {
    history.push('/admin/users');
  };

  const navigateToProductsPage = () => {
    history.push('/admin/view-product');
  };

  const navigateToCategoriesPage = () => {
    history.push('/admin/view-category');
  };

  const navigateToOrdersPage = () => {
    history.push('/admin/orders');
  };

  const navigateToReturnsPage = () => {
    history.push('/admin/returns');
  };

  const fetchDailyRevenueData = async () => {
    try {
      const response = await axios.get(`/api/admin/daily-revenue`);
      const { status, dailyRevenueData } = response.data;

      if (status === 200) {
        setDailyRevenueData(dailyRevenueData);
      } else {
        console.error('API returned an error:', response.data);
      }
    } catch (error) {
      console.error('Error fetching daily revenue data:', error);
    }
  };


  // Constants for chart dimensions and calculations
  const x0 = 50;
  const xAxisLength = SVG_WIDTH - x0 * 2;
  const y0 = 50;
  const yAxisLength = SVG_HEIGHT - y0 * 2;
  const xAxisY = y0 + yAxisLength;
  const revenueValues = dailyRevenueData.map(dataPoint => parseInt(dataPoint.revenue, 10));

  const dataYMax = revenueValues.reduce((currMax, dataY) => Math.max(currMax, dataY), -Infinity);
  const dataYMin = 0;


  const dataYRange = dataYMax - dataYMin;
  const numYTicks = 5;
  const barPlotWidth = xAxisLength / dailyRevenueData.length;
  

  
  
  
  
  
  
  
  
   
  
  


  return (
    <div className="dashboard-container">
      <div className="title-container">
      <h1 className="dashboard-title">Dashboard</h1>
        <div className="user-info">
          <div className="user-info-content">
          <div className="user-info-text">
          <p className="user-name">Welcome to Dashboard {userInfo.name} (Admin) !!</p>
          <p className="user-email">Registered with Email: {userInfo.email}</p>
        </div>
        <p className="total-revenue">Our total Revenue: {totalOrderItemsPrice}</p>
          </div>
        </div>

        </div>
      <div className="dashboard-stats">
        <div className="dashboard-stat">
            <button onClick={navigateToUsersPage} className="dashboard-link user-button">
            Total Users: {userCount}
            </button>
        </div>
        <div className="dashboard-stat">
            <button onClick={navigateToProductsPage} className="dashboard-link product-button">
            Total Products: {productCount}
            </button>
        </div>
        <div className="dashboard-stat">
            <button onClick={navigateToCategoriesPage} className="dashboard-link category-button">
            Total Categories: {categoryCount}
            </button>
        </div>
        <div className="dashboard-stat">
            <button onClick={navigateToOrdersPage} className="dashboard-link order-button">
            Total Orders: {orderCount}
            </button>
        </div>
        <div className="dashboard-stat">
            <button onClick={navigateToReturnsPage} className="dashboard-link return-button">
            Total Returns: {returnCount}
            </button>
        </div>

        <div>
          <h1 className='mb-4'>Daily Revenue Chart</h1>
          <div className="bar-chart" >
            <svg width={SVG_WIDTH} height={SVG_HEIGHT}>
              <line x1={x0} y1={xAxisY} x2={x0 + xAxisLength} y2={xAxisY} stroke="grey" />
              <text x={x0 + xAxisLength + 5} y={xAxisY + 4}>
                Date
              </text>
              <line x1={x0} y1={y0} x2={x0} y2={y0 + yAxisLength} stroke="grey" />
              {Array.from({ length: numYTicks }).map((_, index) => {
                const y = y0 + index * (yAxisLength / numYTicks);
                const yValue = Math.round(dataYMax - index * (dataYRange / numYTicks));
                return (
                  <g key={index}>
                    <line x1={x0} y1={y} x2={x0 - 5} y2={y} stroke="grey" />
                    <text x={x0 - 5} y={y + 5} textAnchor="end">
                      {yValue}
                    </text>
                  </g>
                );
              })}
              <text x={x0} y={y0 - 8} textAnchor="middle">
                Price
              </text>
              {dailyRevenueData.map((dataPoint, index) => {
                const x = x0 + index * barPlotWidth;
                const dataY = parseInt(dataPoint.revenue, 10);
                const yRatio = (dataY - dataYMin) / dataYRange;
                const y = y0 + (1 - yRatio) * yAxisLength;
                const height = yRatio * yAxisLength;
                const sidePadding = 10;

                // Format the date to MM/DD format
                const date = new Date(dataPoint.date);
                const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;

                return (
                  <g key={index}>
                    <rect
                      x={x + sidePadding / 2}
                      y={y}
                      width={barPlotWidth - sidePadding}
                      height={height}
                      fill="green" // Set the fill color to green
                    />
                    <text x={x + barPlotWidth / 2} y={xAxisY + 16} textAnchor="middle">
                      {formattedDate}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
    
      </div>
    </div>
  );
}

export default Dashboard;

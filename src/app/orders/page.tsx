'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Search,
  FilterList,
  Add,
  Edit,
  Delete,
  Visibility,
  ShoppingCart,
  LocalShipping,
  CheckCircle,
  Cancel,
  Pending,
  TrendingUp,
  AttachMoney,
  Inventory,
  Schedule
} from '@mui/icons-material';
import { 
  Chip,
  IconButton,
  Tooltip,
  Badge
} from '@mui/material';
import { useDashboardStore } from '../../store/dashboardStore';
import { CyberpunkBackground } from '../../components/backgrounds/CyberpunkBackground';
import { Sidebar } from '../../components/dashboard/Sidebar';
import { SplitText } from '../../components/animations/SplitText';
import styles from './orders.module.css';

// 샘플 주문 데이터
const ordersData = [
  {
    id: '#ORD-001',
    customer: 'John Doe',
    email: 'john.doe@example.com',
    products: ['iPhone 13 Pro', 'AirPods Pro'],
    total: 1299.99,
    status: 'completed',
    date: '2024-01-15',
    payment: 'Credit Card',
    shipping: 'Express',
  },
  {
    id: '#ORD-002',
    customer: 'Jane Smith',
    email: 'jane.smith@example.com',
    products: ['MacBook Air', 'Magic Mouse'],
    total: 1499.99,
    status: 'processing',
    date: '2024-01-14',
    payment: 'PayPal',
    shipping: 'Standard',
  },
  {
    id: '#ORD-003',
    customer: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    products: ['iPad Air', 'Apple Pencil'],
    total: 799.99,
    status: 'shipped',
    date: '2024-01-13',
    payment: 'Credit Card',
    shipping: 'Express',
  },
  {
    id: '#ORD-004',
    customer: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    products: ['Apple Watch Series 7'],
    total: 399.99,
    status: 'pending',
    date: '2024-01-12',
    payment: 'Credit Card',
    shipping: 'Standard',
  },
  {
    id: '#ORD-005',
    customer: 'David Brown',
    email: 'david.brown@example.com',
    products: ['iMac 24"', 'Magic Keyboard'],
    total: 1999.99,
    status: 'cancelled',
    date: '2024-01-11',
    payment: 'Credit Card',
    shipping: 'Express',
  },
];

export default function Orders() {
  const { sidebarOpen } = useDashboardStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');

  const filteredOrders = ordersData.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#22c55e';
      case 'processing':
        return '#22d3ee';
      case 'shipped':
        return '#a855f7';
      case 'pending':
        return '#f97316';
      case 'cancelled':
        return '#ef4444';
      default:
        return '#94a3b8';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle />;
      case 'processing':
        return <Schedule />;
      case 'shipped':
        return <LocalShipping />;
      case 'pending':
        return <Pending />;
      case 'cancelled':
        return <Cancel />;
      default:
        return <Pending />;
    }
  };

  const totalRevenue = ordersData.reduce((sum, order) => sum + order.total, 0);
  const completedOrders = ordersData.filter(order => order.status === 'completed').length;
  const pendingOrders = ordersData.filter(order => order.status === 'pending').length;
  const processingOrders = ordersData.filter(order => order.status === 'processing').length;

  return (
    <div className={styles.orders}>
      {/* 사이버펑크 배경 */}
      <CyberpunkBackground />
      
      {/* 사이드바 */}
      <Sidebar />
      
      {/* 메인 콘텐츠 */}
      <div className={`${styles.mainContent} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        {/* 헤더 */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.header}
        >
          <div className={styles.headerContent}>
            <div>
              <SplitText
                text="Order Management"
                className={styles.title}
                variant="slideRight"
              />
              <p className={styles.subtitle}>Track and manage all your orders</p>
            </div>
            
            <div className={styles.headerActions}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={styles.exportButton}
              >
                <TrendingUp />
                <span>Export Orders</span>
              </motion.button>
            </div>
          </div>
        </motion.header>
        
        {/* 메인 콘텐츠 */}
        <main className={styles.main}>
          {/* 필터 및 검색 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={styles.filters}
          >
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            
            <div className={styles.filterContainer}>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
              
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </motion.div>

          {/* 주문 통계 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={styles.statsGrid}
          >
            <div className={`${styles.statCard} ${styles.purple}`}>
              <div className={styles.statIcon}>
                <ShoppingCart />
              </div>
              <div className={styles.statContent}>
                <h3>Total Orders</h3>
                <div className={styles.statValue}>{ordersData.length}</div>
                <div className={styles.statChange}>+15 this month</div>
              </div>
            </div>

            <div className={`${styles.statCard} ${styles.cyan}`}>
              <div className={styles.statIcon}>
                <AttachMoney />
              </div>
              <div className={styles.statContent}>
                <h3>Total Revenue</h3>
                <div className={styles.statValue}>${totalRevenue.toLocaleString()}</div>
                <div className={styles.statChange}>+8.5% vs last month</div>
              </div>
            </div>

            <div className={`${styles.statCard} ${styles.green}`}>
              <div className={styles.statIcon}>
                <CheckCircle />
              </div>
              <div className={styles.statContent}>
                <h3>Completed</h3>
                <div className={styles.statValue}>{completedOrders}</div>
                <div className={styles.statChange}>{Math.round((completedOrders / ordersData.length) * 100)}% success rate</div>
              </div>
            </div>

            <div className={`${styles.statCard} ${styles.orange}`}>
              <div className={styles.statIcon}>
                <Pending />
              </div>
              <div className={styles.statContent}>
                <h3>Pending</h3>
                <div className={styles.statValue}>{pendingOrders + processingOrders}</div>
                <div className={styles.statChange}>Needs attention</div>
              </div>
            </div>
          </motion.div>

          {/* 주문 목록 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={styles.ordersList}
          >
            <div className={styles.listHeader}>
              <h3>Orders ({filteredOrders.length})</h3>
            </div>
            
            <div className={styles.ordersGrid}>
              {filteredOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={styles.orderCard}
                >
                  <div className={styles.orderHeader}>
                    <div className={styles.orderInfo}>
                      <div className={styles.orderId}>{order.id}</div>
                      <div className={styles.orderDate}>{order.date}</div>
                    </div>
                    
                    <div className={styles.orderActions}>
                      <Tooltip title="View Details">
                        <IconButton className={styles.actionButton}>
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      
                      <Tooltip title="Edit Order">
                        <IconButton className={styles.actionButton}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      
                      <Tooltip title="More Options">
                        <IconButton className={styles.actionButton}>
                          <FilterList />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                  
                  <div className={styles.customerInfo}>
                    <div className={styles.customerName}>{order.customer}</div>
                    <div className={styles.customerEmail}>{order.email}</div>
                  </div>
                  
                  <div className={styles.productsList}>
                    <div className={styles.productsLabel}>Products:</div>
                    <div className={styles.products}>
                      {order.products.map((product, idx) => (
                        <span key={idx} className={styles.product}>
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className={styles.orderDetails}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Total:</span>
                      <span className={styles.detailValue}>${order.total.toFixed(2)}</span>
                    </div>
                    
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Payment:</span>
                      <span className={styles.detailValue}>{order.payment}</span>
                    </div>
                    
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Shipping:</span>
                      <span className={styles.detailValue}>{order.shipping}</span>
                    </div>
                  </div>
                  
                  <div className={styles.orderStatus}>
                    <Chip
                      icon={getStatusIcon(order.status)}
                      label={order.status}
                      size="small"
                      sx={{
                        backgroundColor: getStatusColor(order.status),
                        color: 'white',
                        fontWeight: 500,
                        textTransform: 'capitalize',
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
} 
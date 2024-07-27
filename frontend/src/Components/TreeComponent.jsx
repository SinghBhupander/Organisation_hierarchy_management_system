// TreeComponent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  Card } from 'react-bootstrap';


const TreeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchAllEmployees = async () => {
        let allEmployees = [];
        let currentPage = 1;
        const pageSize = 5;
  
        try {
          while (true) {
            const response = await axios.get(`http://localhost:8080/api/employees?page=${currentPage}&limit=${pageSize}`);
            if (response.data && response.data.data && Array.isArray(response.data.data.employees)) {
              allEmployees = [...allEmployees, ...response.data.data.employees];
              if (response.data.data.employees.length < pageSize) {
                break; // Exit loop if the last page has fewer employees than the page size
              }
              currentPage++;
            } else {
              console.error('Fetched data is not in the expected format:', response.data);
              break;
            }
          }
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
  
        setEmployees(allEmployees);
        setLoading(false);
      };
  
      fetchAllEmployees();
    }, []);
  
    const buildHierarchy = (employees) => {
      const employeeMap = new Map();
      const tree = [];
      const missingManagers = new Map();
  
      employees.forEach(emp => {
        employeeMap.set(emp.name, { ...emp, children: [] });
      });
  
      console.log('Employee Map:', employeeMap);
  
      employeeMap.forEach(emp => {
        if (emp.manager) {
          const manager = employeeMap.get(emp.manager);
          if (manager) {
            manager.children.push(emp);
          } else {
            if (!missingManagers.has(emp.manager)) {
              const placeholder = {
                name: emp.manager,
                manager: null,
                children: [emp],
              };
              missingManagers.set(emp.manager, placeholder);
              tree.push(placeholder);
            } else {
              missingManagers.get(emp.manager).children.push(emp);
            }
            console.warn(`Manager ${emp.manager} not found for employee ${emp.name}`);
          }
        } else {
          tree.push(emp);
        }
      });
  
      console.log('Hierarchy built:', tree);
      return tree;
    };
  
    const hierarchicalData = buildHierarchy(employees);
  
    const renderTree = (nodes) => (
        <ul className="list-unstyled" style={{ borderLeft: '1px solid #d3d3d3', paddingLeft: '20px' }}>
        {nodes.map(node => (
          <li key={node._id || node.name} style={{ marginBottom: '10px' }}>
            <Card className="mb-2" style={{ backgroundColor: node.children.length > 0 ? '#DDD4D4' : '#EBF0F7' }}>
              <Card.Body>
                <Card.Title>{node.children.length > 0 ? `Manager: ${node.name}` : node.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{node.department}</Card.Subtitle>
                {node.children.length === 0 && (
                  <Card.Text>Email: {node.email}<br/>Phone: {node.phone}</Card.Text>
                )}
              </Card.Body>
            </Card>
            {node.children.length > 0 && renderTree(node.children)}
          </li>
        ))}
      </ul>
    );
  
    return (
      <div className="container mt-4">
        <h1>Organization Chart</h1>
        {loading ? <div>Loading...</div> : <div>{hierarchicalData.length > 0 ? renderTree(hierarchicalData) : 'No data available'}</div>}
      </div>
    );
  };


export default TreeComponent;
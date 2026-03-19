import React, { useEffect, useMemo, useState } from "react";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function RecordsChart() {
    const [monthlyData, setMonthlyData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState("All");
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        fetch("/api/records")
            .then((response) => response.json())
            .then((data) => {
                setMonthlyData(data.monthlyData || []);
                setCategoryData(data.categoryData || []);
            })
            .catch((error) => console.error("Error fetching records:", error));
    }, []);

    const monthOptions = ["All", ...monthlyData.map((item) => item.month)];
    const categoryOptions = ["All", ...categoryData.map((item) => item.category)];

    const filteredMonthlyData =
        selectedMonth === "All"
            ? monthlyData
            : monthlyData.filter((item) => item.month === selectedMonth);

    const filteredCategoryData =
        selectedCategory === "All"
            ? categoryData
            : categoryData.filter((item) => item.category === selectedCategory);

    const fixedFilteredCategoryData = filteredCategoryData.map((item) => ({
        ...item,
        total_value: Number(item.total_value),
    }));

    const totalValue = useMemo(() => {
        return filteredMonthlyData.reduce(
            (sum, item) => sum + Number(item.total_value),
            0
        );
    }, [filteredMonthlyData]);

    const highestMonth = useMemo(() => {
        if (filteredMonthlyData.length === 0) return null;

        return filteredMonthlyData.reduce((highest, current) =>
            Number(current.total_value) > Number(highest.total_value)
                ? current
                : highest
        );
    }, [filteredMonthlyData]);

    const averageMonthlyValue = useMemo(() => {
        if (filteredMonthlyData.length === 0) return 0;
        return (totalValue / filteredMonthlyData.length).toFixed(2);
    }, [filteredMonthlyData, totalValue]);

    const pieColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

    const cardStyle = {
        backgroundColor: "#f8f9fa",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        textAlign: "center",
    };

    const sectionStyle = {
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        marginBottom: "30px",
    };

    return (
        <div
            style={{
                padding: "30px",
                fontFamily: "Arial, sans-serif",
                backgroundColor: "#f4f6f8",
                minHeight: "100vh",
            }}
        >
            <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
                Data Visualization Dashboard
            </h1>

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    marginBottom: "30px",
                    flexWrap: "wrap",
                }}
            >
                <div>
                    <label
                        style={{
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: "bold",
                        }}
                    >
                        Filter by Month
                    </label>
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        style={{
                            padding: "10px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            minWidth: "180px",
                        }}
                    >
                        {monthOptions.map((month, index) => (
                            <option key={index} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label
                        style={{
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: "bold",
                        }}
                    >
                        Filter by Category
                    </label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        style={{
                            padding: "10px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            minWidth: "180px",
                        }}
                    >
                        {categoryOptions.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "20px",
                    marginBottom: "30px",
                }}
            >
                <div style={cardStyle}>
                    <h3>Total Value</h3>
                    <p style={{ fontSize: "28px", fontWeight: "bold" }}>
                        {totalValue}
                    </p>
                </div>

                <div style={cardStyle}>
                    <h3>Highest Month</h3>
                    <p style={{ fontSize: "22px", fontWeight: "bold" }}>
                        {highestMonth ? highestMonth.month : "N/A"}
                    </p>
                </div>

                <div style={cardStyle}>
                    <h3>Highest Month Value</h3>
                    <p style={{ fontSize: "28px", fontWeight: "bold" }}>
                        {highestMonth ? highestMonth.total_value : "N/A"}
                    </p>
                </div>

                <div style={cardStyle}>
                    <h3>Average Monthly Value</h3>
                    <p style={{ fontSize: "28px", fontWeight: "bold" }}>
                        {averageMonthlyValue}
                    </p>
                </div>
            </div>

            <div style={sectionStyle}>
                <h2 style={{ marginBottom: "20px" }}>
                    Monthly Total Values - Bar Chart
                </h2>
                <div style={{ width: "100%", height: 350 }}>
                    <ResponsiveContainer>
                        <BarChart data={filteredMonthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="total_value"
                                fill="#8884d8"
                                name="Total Value"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div style={sectionStyle}>
                <h2 style={{ marginBottom: "20px" }}>
                    Monthly Total Values - Line Chart
                </h2>
                <div style={{ width: "100%", height: 350 }}>
                    <ResponsiveContainer>
                        <LineChart data={filteredMonthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="total_value"
                                stroke="#82ca9d"
                                name="Total Value"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: "30px",
                }}
            >
                <div style={sectionStyle}>
                    <h2 style={{ marginBottom: "20px" }}>
                        Category Distribution - Pie Chart
                    </h2>
                    <div style={{ width: "100%", height: 350 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={fixedFilteredCategoryData}
                                    dataKey="total_value"
                                    nameKey="category"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label
                                    isAnimationActive={false}
                                >
                                    {fixedFilteredCategoryData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={pieColors[index % pieColors.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div style={sectionStyle}>
                    <h2 style={{ marginBottom: "20px" }}>
                        Category Totals - Bar Chart
                    </h2>
                    <div style={{ width: "100%", height: 350 }}>
                        <ResponsiveContainer>
                            <BarChart data={filteredCategoryData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="category" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    dataKey="total_value"
                                    fill="#ffc658"
                                    name="Total Value"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
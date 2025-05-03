// Chart data for UNC Charlotte fundraising over the years
const summaryChartData = {
    title: "Niner Nation Gives Fundraising Growth (2016-2025)",
    description: "This chart shows the growth of the annual Niner Nation Gives fundraising campaign over the past decade. The 2025 campaign set a new record with $4.9 million raised, demonstrating the increasing support for UNC Charlotte from alumni, students, faculty, staff, and friends of the university.",
    source: "UNC Charlotte Advancement Office",
    data: [
      { year: "2016", amount: 0.8 },
      { year: "2017", amount: 1.2 },
      { year: "2018", amount: 1.9 },
      { year: "2019", amount: 2.4 },
      { year: "2020", amount: 2.1 },
      { year: "2021", amount: 2.8 },
      { year: "2022", amount: 3.2 },
      { year: "2023", amount: 3.7 },
      { year: "2024", amount: 4.1 },
      { year: "2025", amount: 4.9 }
    ]
  };
  
  // Chart data for donation distribution
  const reportsChartData = {
    title: "Donation Distribution by Category (2025)",
    description: "This pie chart illustrates how donations to UNC Charlotte were distributed across different categories during the 2025 Niner Nation Gives campaign. Scholarships received the largest portion of donations, followed by academic programs and campus development initiatives, reflecting the community's commitment to student success and educational excellence.",
    source: "UNC Charlotte Advancement Office",
    data: [
      { category: "Scholarships", percentage: 35 },
      { category: "Academic Programs", percentage: 25 },
      { category: "Campus Development", percentage: 20 },
      { category: "Athletics", percentage: 12 },
      { category: "Research", percentage: 8 }
    ]
  };
  
  module.exports = { summaryChartData, reportsChartData };
  
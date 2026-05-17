
import React from 'react';
import '../JobSearch.css'; 

const companies = [
  {
    name: "Google",
    logo: "https://logo.clearbit.com/google.com",
    careerLink: "https://careers.google.com/"
  },
  {
    name: "Microsoft",
    logo: "https://logo.clearbit.com/microsoft.com",
    careerLink: "https://careers.microsoft.com/"
  },
  {
    name: "Amazon",
    logo: "https://logo.clearbit.com/amazon.com",
    careerLink: "https://www.amazon.jobs/"
  },
  {
    name: "Apple",
    logo: "https://logo.clearbit.com/apple.com",
    careerLink: "https://jobs.apple.com/"
  },
  {
    name: "Facebook",
    logo: "https://logo.clearbit.com/facebook.com",
    careerLink: "https://www.metacareers.com/"
  },
  {
    name: "Netflix",
    logo: "https://logo.clearbit.com/netflix.com",
    careerLink: "https://jobs.netflix.com/"
  },
  {
    name: "TCS",
    logo: "https://logo.clearbit.com/tcs.com",
    careerLink: "https://www.tcs.com/careers"
  },
  {
    name: "Infosys",
    logo: "https://logo.clearbit.com/infosys.com",
    careerLink: "https://www.infosys.com/careers/"
  },
  {
    name: "Wipro",
    logo: "https://logo.clearbit.com/wipro.com",
    careerLink: "https://careers.wipro.com/"
  },
  {
    name: "HCL",
    logo: "https://logo.clearbit.com/hcl.com",
    careerLink: "https://www.hcltech.com/careers"
  },
  {
    name: "IBM",
    logo: "https://logo.clearbit.com/ibm.com",
    careerLink: "https://www.ibm.com/employment/"
  },
  {
    name: "Accenture",
    logo: "https://logo.clearbit.com/accenture.com",
    careerLink: "https://www.accenture.com/in-en/careers"
  },
  {
    name: "Cognizant",
    logo: "https://logo.clearbit.com/cognizant.com",
    careerLink: "https://careers.cognizant.com/"
  },
  {
    name: "Capgemini",
    logo: "https://logo.clearbit.com/capgemini.com",
    careerLink: "https://www.capgemini.com/careers/"
  }
];

const JobSearch = () => {
  return (
    <div className="job-search-container">
      <h2>Featured Companies</h2>
      <div className="company-grid">
        {companies.map((company, index) => (
          <div className="company-card" key={index}>
            <div className="company-info">
              <img src={company.logo} alt={company.name} className="company-logo" />
              <h3>{company.name}</h3>
            </div>
            <a
              href={company.careerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="career-button"
            >
              Visit Career
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobSearch;

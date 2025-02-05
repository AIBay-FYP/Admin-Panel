'use client'

import ClientSearchSection from "@/components/ClientSearchSection"
import ToggleSwitch from "@/components/ToggleSwitch"

const { default: ComplianceSearches } = require("@/components/complianceSearches")
const { default: ComplianceServices } = require("@/components/ComplianceServices")


const ComplianceMonitoring = ()=>{
    const handleSwitch = (selectedTab) => {
        console.log('Switched to:', selectedTab);
      };
    return (
        <div className="bg-dark mt-10 rounded">
        {/* <ClientSearchSection/> */}
        <ToggleSwitch
        title="Compliance Monitoring"
        buttonLabels={['Searches', 'Services']}
        components={{
          Searches: ComplianceSearches,
          Services: ComplianceServices,
        }}
        onSwitch={handleSwitch}
      />
      </div>
    )
}

export default ComplianceMonitoring
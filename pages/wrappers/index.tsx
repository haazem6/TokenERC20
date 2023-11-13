import ContentWrapper from "../../components/layout/ContentWrapper"
import CenteredContent from "../../components/layout/CenteredContent"
import WrappersList from "../../components/WrappersList"

// Next.js page component for displaying a list of wrapper tokens
export default function Wrappers() {
  return (
    // Wrapping the page content with a custom layout
    <ContentWrapper
      title="Home"
      description="List of transfer tokens created ."
    > 
      {/* Centering the content on the page */}
      <CenteredContent size="md">
        {/* Component to display a list of wrapper tokens */}
        <WrappersList />
      </CenteredContent>
    </ContentWrapper>
  )
}

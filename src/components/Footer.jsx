import React from "react";
import {
  Footer,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";

const FooterBanner = () => {
  return (
    <div>
      <Footer
        container
        className="bg-[#1e293b] border-t border-[rgba(96,165,250,0.2)] rounded-none py-[40px] px-10"
      >
        <FooterLinkGroup>
          <FooterLink href="#" className="text-[#94a3b8]">
            Terms of Use{" "}
          </FooterLink>
          <FooterLink href="#" className="text-[#94a3b8]">
            Privacy Policy
          </FooterLink>
        </FooterLinkGroup>
        <FooterCopyright
          href="#"
          by="Clin Technologies. All rights reserved."
          year={2025}
        />
      </Footer>
    </div>
  );
};

export default FooterBanner;

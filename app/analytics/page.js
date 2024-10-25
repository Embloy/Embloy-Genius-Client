"use client";
import React, {useState} from "react";
import { useRouter } from 'next/navigation';
import { EmbloyPageMount, EmbloyPage, EmbloyPageBody, EmbloyPageBodySection, EmbloySubPage } from "@/app/components/ui/misc/page";
import { EmbloyBox, EmbloyBoxContent } from "@/app/components/ui/misc/box";
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer} from "@/app/components/ui/misc/stuff";
import { EmbloyToolbox, EmbloyToolboxImgA} from "@/app/components/ui/misc/toolbox";

export default function Analytics() {  
  const subPages = [{name:'Hub', id:0}]
  const router = useRouter();
  const [currentSubPageID, setcurrentSubPageID] = useState(0);
  
  const handlePageChange = (id) => {
    setIntegrationToken();
    setcurrentSubPageID(id);
    const tabName = subPages.find(page => page.id === id).name.toLowerCase();
    router.push(`?tab=${tabName}`);
}
  return (
    <EmbloyPageMount className="overflow-hidden">
      <EmbloyPage sandboxed={false}>
        <EmbloyPageBody >
          <EmbloyPageBodySection>
            <EmbloyV>
              <EmbloyH className="justify-between">
                <h1 className="page-header">Genius Analytics Studio</h1>
                <EmbloyToolbox superClassName="portrait:hidden">
                    <EmbloyToolboxImgA tooltip="More about Genius Analytics" href="https://developers.embloy.com/docs/category/genius/analytics" height="12" width="12" path="/icons/svg/black/ask.svg" path_hovered="/icons/svg/leidoveneta/ask.svg" dark_path="/icons/svg/amarone/ask.svg" dark_path_hovered="/icons/svg/barbera/ask.svg" target="_blank" />
                </EmbloyToolbox>
              </EmbloyH>
              <EmbloySpacer />
              <EmbloySubPage 
                pages={subPages}
                onPageChange={handlePageChange}
                externalSetActivePage={currentSubPageID}
                showSubPageBar={false}
              >

              </EmbloySubPage>
            </EmbloyV>
          </EmbloyPageBodySection>
        </EmbloyPageBody >
      </EmbloyPage>

    
    
    </EmbloyPageMount>
  );
}

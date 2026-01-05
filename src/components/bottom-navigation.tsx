// src/components/bottom-navigation.tsx
"use client";

import { Tabs, TabItem } from "@worldcoin/mini-apps-ui-kit-react";
import { 
  HowToVote, 
  AddCircleOutline, 
  PeopleOutline, 
  AccountCircle, 
  Settings, 
  Assessment 
} from "@mui/icons-material"; // Ikon Material Design 3
import { HapticWrapper } from "~/components/haptic-wrapper";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: any) => void;
  isAdmin: boolean;
  pollCreated: boolean;
}

export function BottomNavigation({ activeTab, onTabChange, isAdmin, pollCreated }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-3 z-50">
      <div className="max-w-lg mx-auto">
        <Tabs value={activeTab}>
          <HapticWrapper onClick={() => onTabChange("vote")} hapticType="selection">
            <TabItem value="vote" icon={<HowToVote />} label="Vote" />
          </HapticWrapper>

          {/* Tab Hasil - Hanya Admin yang bisa melihat */}
          {isAdmin && pollCreated && (
            <HapticWrapper onClick={() => onTabChange("results")} hapticType="selection">
              <TabItem value="results" icon={<Assessment />} label="Hasil" />
            </HapticWrapper>
          )}

          {isAdmin && !pollCreated && (
            <HapticWrapper onClick={() => onTabChange("create")} hapticType="selection">
              <TabItem value="create" icon={<AddCircleOutline />} label="Mulai" />
            </HapticWrapper>
          )}

          {isAdmin && (
            <>
              <HapticWrapper onClick={() => onTabChange("admin")} hapticType="selection">
                <TabItem value="admin" icon={<PeopleOutline />} label="Murid" />
              </HapticWrapper>
              <HapticWrapper onClick={() => onTabChange("settings")} hapticType="selection">
                <TabItem value="settings" icon={<Settings />} label="Setting" />
              </HapticWrapper>
            </>
          )}

          <HapticWrapper onClick={() => onTabChange("wallet")} hapticType="selection">
            <TabItem value="wallet" icon={<AccountCircle />} label="Profil" />
          </HapticWrapper>
        </Tabs>
      </div>
    </div>
  );
}
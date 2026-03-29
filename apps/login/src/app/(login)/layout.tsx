import "@/styles/globals.scss";

import { BackgroundWrapper } from "@/components/background-wrapper";
import { LanguageProvider } from "@/components/language-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Skeleton } from "@/components/skeleton";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeSwitch from "@/components/theme-switch";
import { LANGS, getLanguage } from "@/lib/i18n";
import { getServiceConfig } from "@/lib/service-url";
import { getAllowedLanguages } from "@/lib/zitadel";
import * as Tooltip from "@radix-ui/react-tooltip";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Lato } from "next/font/google";
import { headers } from "next/headers";
import React, { Suspense } from "react";

const lato = Lato({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("common");
  return { title: t("title") };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const _headers = await headers();
  const { serviceConfig } = getServiceConfig(_headers);

  let languages = LANGS;
  try {
    const settings = await getAllowedLanguages({ serviceConfig });
    if (settings.allowedLanguages?.length) {
      languages = settings.allowedLanguages
        .filter((code) => LANGS.find((l) => l.code === code))
        .map((code) => getLanguage(code));
    }
  } catch (e) {
    console.error("Failed to load supported languages", e);
  }

  return (
    <html className={`${lato.className}`} suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider>
          <Tooltip.Provider>
            <Suspense
              fallback={
                <BackgroundWrapper
                  className={`relative flex min-h-screen flex-col justify-center bg-background-light-600 dark:bg-background-dark-600`}
                >
                  <div className="relative mx-auto w-full max-w-[440px] py-8">
                    <Skeleton>
                      <div className="h-40"></div>
                    </Skeleton>
                    <div className="flex flex-row items-center justify-end space-x-4 py-4">
                      <ThemeSwitch />
                    </div>
                  </div>
                </BackgroundWrapper>
              }
            >
              <LanguageProvider>
                <BackgroundWrapper className={`relative flex min-h-screen flex-col justify-center bg-background-light-600 dark:bg-background-dark-600`} >
                  <div className="relative mx-auto w-full max-w-[1100px] py-8">
                    <div>{children}</div>

                    {/* Unified Footer Container */}
                    <div className="mx-auto flex w-full max-w-[440px] flex-col md:flex-row items-center justify-between gap-y-4 px-4 py-4 md:max-w-full md:px-8">

                      {/* Left Side Links */}
                      <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-500 dark:text-gray-400 ml-2 md:ml-2">
                        {process.env.NEXT_PUBLIC_FOOTER_L1_URL && process.env.NEXT_PUBLIC_FOOTER_L1_TEXT && (
                          <a href={process.env.NEXT_PUBLIC_FOOTER_L1_URL} className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                            {process.env.NEXT_PUBLIC_FOOTER_L1_TEXT}
                          </a>
                        )}
                        {process.env.NEXT_PUBLIC_FOOTER_L2_URL && process.env.NEXT_PUBLIC_FOOTER_L2_TEXT && (
                          <a href={process.env.NEXT_PUBLIC_FOOTER_L2_URL} className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                            {process.env.NEXT_PUBLIC_FOOTER_L2_TEXT}
                          </a>
                        )}
                        {process.env.NEXT_PUBLIC_FOOTER_L3_URL && process.env.NEXT_PUBLIC_FOOTER_L3_TEXT && (
                          <a href={process.env.NEXT_PUBLIC_FOOTER_L3_URL} className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                            {process.env.NEXT_PUBLIC_FOOTER_L3_TEXT}
                          </a>
                        )}
                      </div>

                      {/* Right Side Links & Switchers */}
                      <div className="flex flex-wrap items-center justify-center gap-4">

                        {/* Only render this wrapper (and its border) if at least one right-side link exists */}
                        {(process.env.NEXT_PUBLIC_FOOTER_R1_URL || process.env.NEXT_PUBLIC_FOOTER_R2_URL) && (
                          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 md:mr-2 md:border-r border-gray-300 dark:border-gray-700 md:pr-4">
                            {process.env.NEXT_PUBLIC_FOOTER_R1_URL && process.env.NEXT_PUBLIC_FOOTER_R1_TEXT && (
                              <a href={process.env.NEXT_PUBLIC_FOOTER_R1_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                                {process.env.NEXT_PUBLIC_FOOTER_R1_TEXT}
                              </a>
                            )}
                            {process.env.NEXT_PUBLIC_FOOTER_R2_URL && process.env.NEXT_PUBLIC_FOOTER_R2_TEXT && (
                              <a href={process.env.NEXT_PUBLIC_FOOTER_R2_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                                {process.env.NEXT_PUBLIC_FOOTER_R2_TEXT}
                              </a>
                            )}
                          </div>
                        )}

                        {/* Switchers */}
                        <div className="flex items-center space-x-4">
                          <LanguageSwitcher languages={languages} />
                          <ThemeSwitch />
                        </div>
                      </div>
                    </div>
                    {/* End of Unified Footer Container */}

                  </div>
                </BackgroundWrapper>
              </LanguageProvider>
            </Suspense>
          </Tooltip.Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}

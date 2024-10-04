'use client';

import React from 'react';
import { AudioDemo } from '@/components/landingPage/AudioDemo';
import { ContextualAwarenessFiles, ModelFiles, MultilingualFiles } from '@/lib/constants';
import { LanguagePopover } from './LanguagePopover';



export const Features = () => {

  const featuresContent = [
    {
      title: 'fantastical',
      iconName: 'IconWand',
      iconStyle: 'text-secondary',
      files: ModelFiles,
      description: (
        <>
          choose from a collection of <span className='font-medium'>colorful, character-driven voices</span> tailored for immersive storytelling.
        </>
      ),
    },
    {
      title: 'intuitive',
      iconName: 'IconBrain',
      iconStyle: 'text-danger',
      files: ContextualAwarenessFiles,
      description: (
        <>
          with text-based nuances and emotional accuracy,
          dialogue isn&apos;t just read - it&apos;s <em>performed</em>.
        </>
      ),
    },
    {
      title: 'multilingual',
      iconName: 'IconGlobe',
      iconStyle: 'text-success',
      files: MultilingualFiles,
      description: (
        <>
          create authentic, expressive speech by simply writing in one of 32 supported languages.
          <LanguagePopover />
        </>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h2>ai-powered voice synthesis</h2>


      <div className="flex flex-col gap-8">
        {featuresContent.map((feature) => (
          <AudioDemo
            key={feature.title}
            title={feature.title}
            iconName={feature.iconName}
            iconStyle={feature.iconStyle}
            files={feature.files}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};
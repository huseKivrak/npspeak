'use client';

import React from 'react';
import { AudioDemo } from '@/components/landingPage/AudioDemo';
import { ContextualAwarenessFiles, ModelFiles, MultilingualFiles } from '@/lib/constants';
import { LanguagePopover } from './LanguagePopover';
import { Divider } from '@nextui-org/react';



export const Features = () => {

  const featuresContent = [
    {
      title: 'intuitive',
      iconName: 'IconBrain',
      iconStyle: 'text-danger',
      files: ContextualAwarenessFiles,
      description: (
        <>
          use contextually aware voices to produce natural,
          expressive speech &mdash; complete with text-based nuance and emotional accuracy.
          <br />
          <br />
          dialogue isn&apos;t just read - it&apos;s <em>performed</em>.
        </>
      ),
    },
    {
      title: 'fantastical',
      iconName: 'IconWand',
      iconStyle: 'text-warning',
      files: ModelFiles,
      description: (
        <>
          choose from a collection of <span className='font-medium'>colorful, character-driven voices</span> tailored for immersive storytelling.

          <br />
          <br />
          here&apos;s <span className='font-medium'>carmen, dr.doktor</span>, and the <span className='font-medium'>demon</span>.
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
          <br />
          <br />
          listen as <span className='font-medium'>oxley</span> speaks in
          <span className='italic tracking-normal'> english, spanish, and turkish</span>.
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
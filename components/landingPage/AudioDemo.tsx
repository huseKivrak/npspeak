'use client';

import React from 'react';
import { Tabs, Tab, Card, CardBody, CardHeader, CardFooter, Divider } from '@nextui-org/react';
import { AudioButton } from '../soundboard/AudioButton';
import { useState, ReactNode } from 'react';
import { DemoFile } from '@/lib/constants';
import { RenderIcon } from '@/utils/renderIcon';
import { cn } from '@/utils/helpers/clsxMerge';

interface AudioDemoProps {
  title: string;
  iconName: string;
  iconStyle?: string;
  description: ReactNode;
  files: DemoFile[];
}

export const AudioDemo: React.FC<AudioDemoProps> = ({ title, iconName, iconStyle, description, files }) => {
  const [ selectedDemo, setSelectedDemo ] = useState<DemoFile>(files[ 0 ]);



  const handleSelectionChange = (key: string) => {
    const selection = files.find(demo => demo.name === key);
    if (selection) setSelectedDemo(selection);
  };

  return (
    <Card
      shadow='none'
      className="flex flex-col sm:flex-row max-w-4xl justify-between bg-content1 font-mono rounded-lg p-4"
    >
      <CardHeader className="flex flex-col w-full sm:w-2/3 items-start gap-2">
        <div className='flex items-center'>
          <RenderIcon iconName={iconName} className={cn('text-2xl md:text-3xl lg:text-4xl xl:text-5xl mr-2', iconStyle)} />
          <h2 className='font-semibold'>{title}</h2>
        </div>
        <p className="mt-2 text-balance tracking-wider md:text-xl ">
          {description}
        </p>
      </CardHeader>

      <Divider className='hidden sm:block w-[1px] bg-default my-2 mr-4' />

      <CardBody className='flex flex-col w-full max-w-md sm:w-1/3 '>
        <Tabs
          fullWidth
          placement='bottom'
          radius='lg'
          variant="solid"
          aria-label={`${title} Demos`}
          selectedKey={selectedDemo.name}
          onSelectionChange={(key) => handleSelectionChange(key as string)}
          classNames={{
            tabList: 'w-full p-0',
            cursor: 'w-full',
            tabContent: 'group-data-[selected=true]:text-lg'
          }}
        >
          {files.map((demo) => (
            <Tab
              key={demo.name}
              title={<RenderIcon iconName={demo.iconName} className={cn('text-xl text-white', demo.iconStyle)} />}
              aria-label={`Play ${demo.name} audio`}
            >
              <Card
                isBlurred
                shadow='sm'
                className="border-none p-0"
              >
                <CardBody className='w-full bg-default-200/40 p-1 h-32 justify-center break-words'>
                  <span className="text-sm md:text-lg text-default-500 text-center text-balance font-alagard  italic">
                    &quot;{demo.text}&quot;
                  </span>
                </CardBody>
              </Card>


            </Tab>
          ))}
        </Tabs>

        <CardFooter className='p-0 pt-2'>
          <AudioButton key={selectedDemo.file} src={selectedDemo.file} className='w-full h-10 rounded-lg' />
        </CardFooter>
      </CardBody>
    </Card >
  );
};
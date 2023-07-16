"use client"

import { deleteProjects, fetchToken } from '@/lib/actions'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const ProjectActions = ({projectId}: {projectId: string}) => {

    const router = useRouter();

    const [isDeleting, setIsDeletaing] = useState (false);

    const handleDelepteProject = async () => {
        setIsDeletaing(true);

        const {token} = await fetchToken();

        try {
            await deleteProjects(projectId, token)

            router.push('/')
        } catch (error) {
            console.log(error);
        }finally{
            setIsDeletaing(false);
        }
    };

  return (
    <>
        <Link href={`/edit-project/${projectId}`}
        className='flexCenter edit-action_btn'
        >
            <Image src="/pencile.svg" width={15} height={15} alt='edit' />
        </Link>
        
        <button
        type='button'
        className={`flexCenter delete-action_btn ${isDeleting ? 'bg-gray' : 'bg-primary-purple'}`}
        onClick={handleDelepteProject}
        >
        <Image src="/trash.svg" width={15} height={15} alt='delete' />
        </button>
    </>
  )
}

export default ProjectActions
'use client';

import React from 'react'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const Tags = ({article}: any) => {

    const Article = article[0];

    return (
        <Stack direction="row" spacing={1}>
          {
            Article.category.map((e: string, i: number) => {
                return (
                    // <Chip label={e} component="a" href={`/tag/${e.toLocaleLowerCase()}`} clickable />
                    <Chip label={e} component="a" key={i} clickable />
                )
            })
          }
        </Stack>
      );
}

export default Tags;
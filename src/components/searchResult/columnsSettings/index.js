import Fade from 'react-reveal/Fade';
import { Image } from 'react-bootstrap';
import React from 'react';

const columnsSettings = [
  {
    Header: '#',
    accessor: 'id',
    Cell: data => (
      <Fade bottom>
        <div>{data.value}</div>
      </Fade>
    ),
  }, {
    Header: 'Image',
    accessor: 'album.cover_medium',
    Cell: data => (
      <Fade>
        <Image
          src={data.value}
          style={{ width: 100, height: 100 }}
        />
      </Fade>
    ),
    sortable: false,
  }, {
    Header: 'Title',
    accessor: 'title',
    Cell: data => (
      <Fade bottom>
        <div>{data.value}</div>
      </Fade>
    ),
  }, {
    Header: 'Album',
    accessor: 'album.title',
    Cell: data => (
      <Fade bottom>
        <div>{data.value}</div>
      </Fade>
    ),
  }, {
    Header: 'Artist',
    accessor: 'artist.name',
    Cell: data => (
      <Fade bottom>
        <div>{data.value}</div>
      </Fade>
    ),
  }, {
    Header: 'Duration',
    accessor: 'duration',
    Cell: data => (
      <Fade bottom>
        <div>
          {`${data.value} seconds`}
        </div>
      </Fade>
    ),
  }];

export default columnsSettings;

import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
    entities: {},
    id: [],
    len: 0
}

export const malSlice = createSlice({
  name: 'mal',
  
  initialState: initialState,

  reducers: {
    remove: (state, action) => {
        delete state.entities[action.payload]
        state.entities.splice(action.payload, 1)
        --state.len
    },
    addOne: (state, action) => {
      if(state.entities.hasOwnProperty(action.payload['id']))
        return

      state.entities.push(action.payload)
      state.id.push(action.payload['id'])
      ++state.len
    },

    addMany: (state, action) => {
      action.payload.forEach(anime => {
        if(state.entities.hasOwnProperty(anime.node['id']))
          return

        state.entities[anime.node['id']] = anime.node
        state.id.push(anime.node['id'])
        ++state.len
      })
    }
  }
})

export const selectMImageHTML = createSelector([
    state => state.mal.entities,
    state => state.mal.id
  ], (entities, ids) => ids.map(id =>
    <img
      src={entities[id]['main_picture']['medium']}
      alt={entities[id]['title']}
      key={id}
    />)
)

export const selectImgsM = createSelector(
  [
    state => state.mal.entities,
    state => state.mal.ids
  ], (entities, ids) => ids.map(id => {  
    return {
      src: entities[id]['main_picture']['medium'],
      alt: entities[id]['title'],
      key: id
    }
  })
)

export const selectImgsL = createSelector(
  [
    state => state.mal.entities,
    state => state.mal.id
  ], (entities, ids) => ids.map(id => {  
    return {
      src: entities[id]['main_picture']['large'],
      alt: entities[id]['title'],
      key: id
    }
  })
)

export const { addOne, addMany, remove } = malSlice.actions

export default malSlice.reducer
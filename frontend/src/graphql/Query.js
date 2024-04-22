export const GENERATE = `
    query generate($page: Int!){
        generate(page: $page){
            pageInfo{
                hasNextPage
            }
            media{
                id
                idMal
                title{
                    english
                    romaji
                }
                coverImage{
                    medium
                    large
                    extraLarge
                }
                description
                bannerImage
                genres
            }
        }
    }
`

export const RECOMMEND = `
    query recommend($page: Int! $genre_in: [String]! $id_not_in: [Int]){
        recommend(page: $page genre_in $genre_in id_not_in $id_not_in){
            media{
                id
                idMal
                title{
                    english
                    romaji
                }
                coverImage{
                    medium
                    large
                    extraLarge
                }
                description
                bannerImage
                genres
            }
        }
    }
`
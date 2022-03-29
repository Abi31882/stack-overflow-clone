import { useContext } from 'react'
import { AnonymousQuestion } from '../../../images/images'
import styles from './home.module.css'
import cn from 'classnames'
import { AuthContext } from '../../../store/auth'

const MainScreen = () => {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <section className={cn(styles.heroArea)}>
      <div className={cn(styles.overlay)}> </div>
      <div className={cn(styles.container)}>
        <div className={cn(styles.row)}>
          <div className={cn(styles.colLg9)}>
            <div className={cn(styles.heroContent)}>
              <h2 className={cn(styles.sectionTitle, styles.textWhite)}>
                Share & grow knowlwdge with us!
              </h2>
              <p className={cn(styles.sectionDesc, styles.textWhite)}>
                If you are going to use a passage of Lorem Ipsum, you need to be
                sure there
                <br />
                isn't anything embarrassing hidden in the middle of text.
              </p>
              <div className={cn(styles.py4)}>
                <a
                  className={cn(styles.themeBtn)}
                  href={isAuthenticated() ? '/questions/ask' : '/auth'}
                  primary
                >
                  Ask a Question
                </a>
              </div>
            </div>
          </div>
          <div className={cn(styles.colLg3)}>
            <div className={cn(styles.heroList)}>
              <div className={cn(styles.dFlex, styles.pb30)}>
                <>
                  <AnonymousQuestion />
                </>
                <p className={cn(styles.lh20)}>Anybody can ask a question</p>
              </div>
              <div className={cn(styles.dFlex, styles.pb30)}></div>
              <div className={cn(styles.dFlex)}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MainScreen

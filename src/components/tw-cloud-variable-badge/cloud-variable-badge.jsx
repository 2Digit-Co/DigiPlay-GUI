import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import cloudIcon from './clouddata.svg';
import CloudServerButton from './cloud-server-button.jsx';
import styles from './cloud-variable-badge.css';
import {APP_NAME} from '../../lib/brand';

const hosts = [
    {
        // Provided by GarboMuffin
        name: 'US East',
        cloudHost: 'wss://clouddata.turbowarp.org'
    },
    {
        // Provided by Apricot
        name: 'EU',
        cloudHost: 'wss://clouddata-eu.turbowarp.org'
    }
];

const CloudVariableBadge = props => (
    <div className={styles.badge}>
        <div className={styles.title}>
            <img
                className={styles.cloudIcon}
                src={cloudIcon}
                alt=""
                width={32}
                height={32}
            />
            <FormattedMessage
                // eslint-disable-next-line max-len
                defaultMessage="This project uses cloud variables."
                description="Cloud variable information shown under projects with cloud variables"
                id="tw.usesCloudVariables"
            />
        </div>

        <FormattedMessage
            // eslint-disable-next-line max-len
            defaultMessage="{APP_NAME}'s cloud variables are not connected to Scratch's. Anyone can {changeTheirUsername} to anything, so beware of impersonation."
            // eslint-disable-next-line max-len
            description="Cloud variable information shown under projects with cloud variables. {changeTheirUsername} will be replaced with a link with text 'change their username' (translated)"
            id="tw.usesCloudVariables2"
            values={{
                APP_NAME,
                changeTheirUsername: (
                    <a onClick={props.onOpenChangeUsername}>
                        <FormattedMessage
                            defaultMessage="change their username"
                            // eslint-disable-next-line max-len
                            description="Link that opens modal to change one's username. Used in the context 'Anyone can change their username'"
                            id="tw.usesCloudVariables2.change"
                        />
                    </a>
                )
            }}
        />

        {hosts.some(i => i.cloudHost === props.cloudHost) ? (
            <div className={styles.servers}>
                <FormattedMessage
                    defaultMessage="Pick a server near you:"
                    description="Appears before a list of cloud variable servers in different countries"
                    id="tw.cloudServers"
                />
                {hosts.map(i => (
                    <CloudServerButton
                        key={i.ws}
                        name={i.name}
                        cloudHost={i.cloudHost}
                        selected={props.cloudHost === i.cloudHost}
                        onClick={props.onSetCloudHost}
                    />
                ))}
            </div>
        ) : (
            <div className={styles.servers}>
                <FormattedMessage
                    defaultMessage="Using a custom cloud variable server: {server}"
                    // eslint-disable-next-line max-len
                    description="Appears when using a non-TurboWarp provided cloud variable server. {server} is replaced with the server's URL, eg. wss://clouddata.turbowarp.org"
                    id="tw.customCloudServer"
                    values={{
                        server: props.cloudHost
                    }}
                />
            </div>
        )}

        <a
            target="_blank"
            rel="noreferrer"
            href="https://docs.turbowarp.org/cloud-variables"
        >
            <FormattedMessage
                defaultMessage="Learn more about cloud variables."
                description="Link for more information about cloud variables"
                id="tw.moreCloud"
            />
        </a>
    </div>
);

CloudVariableBadge.propTypes = {
    cloudHost: PropTypes.string,
    onSetCloudHost: PropTypes.func,
    onOpenChangeUsername: PropTypes.func
};

export default CloudVariableBadge;
